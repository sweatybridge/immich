const DB_MEDIA_PREFIX = 'db:';

export const asDbMediaPath = (id: string) => `${DB_MEDIA_PREFIX}${id}`;

export const getDbMediaId = (path: string | null | undefined): string | null => {
  if (!path?.startsWith(DB_MEDIA_PREFIX)) {
    return null;
  }

  return path.slice(DB_MEDIA_PREFIX.length) || null;
};

export const isDbMediaPath = (path: string | null | undefined): path is string => !!getDbMediaId(path);
