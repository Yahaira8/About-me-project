import { Client } from '@replit/object-storage';

const CONTACT_PREFIX = 'portfolio-contacts/v1/';

export class StorageUnavailableError extends Error {
  constructor(cause) {
    super('App Storage is unavailable.', { cause });
    this.name = 'StorageUnavailableError';
  }
}

async function storageValue(resultPromise) {
  const result = await resultPromise;
  if (!result.ok) {
    throw new StorageUnavailableError(new Error(result.error.message));
  }
  return result.value;
}

async function withStorage(action) {
  try {
    return await action();
  } catch (error) {
    if (error instanceof StorageUnavailableError) throw error;
    throw new StorageUnavailableError(error);
  }
}

// Each contact is its own object so simultaneous submissions cannot overwrite
// each other by racing to update one shared JSON array.
export function createContactStore(clientFactory = () => new Client()) {
  return {
    async save(record) {
      return withStorage(async () => {
        const client = clientFactory();
        await storageValue(
          client.uploadFromText(`${CONTACT_PREFIX}${record.id}.json`, JSON.stringify(record)),
        );
        return record;
      });
    },

    async list() {
      return withStorage(async () => {
        const client = clientFactory();
        const objects = await storageValue(client.list({ prefix: CONTACT_PREFIX }));
        const records = [];
        const files = objects.filter((object) => object.name.endsWith('.json'));

        for (let index = 0; index < files.length; index += 10) {
          const batch = files.slice(index, index + 10);
          const downloaded = await Promise.all(
            batch.map((object) => storageValue(client.downloadAsText(object.name))),
          );
          records.push(...downloaded.map((text) => JSON.parse(text)));
        }

        return records.sort(
          (a, b) => b.timestamp.localeCompare(a.timestamp) || b.id.localeCompare(a.id),
        );
      });
    },

    async markReplied(id, repliedAt) {
      return withStorage(async () => {
        const client = clientFactory();
        const objectName = `${CONTACT_PREFIX}${id}.json`;
        const downloaded = await client.downloadAsText(objectName);
        if (!downloaded.ok && downloaded.error.statusCode === 404) return null;
        const record = JSON.parse(await storageValue(Promise.resolve(downloaded)));
        if (record.replied) return record;

        const updated = { ...record, status: 'replied', replied: true, repliedAt };
        await storageValue(client.uploadFromText(objectName, JSON.stringify(updated)));
        return updated;
      });
    },
  };
}