export const set = <T = any>(key: string, data: T, expires = 0) => {
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      expires: expires ? Date.now() + expires : expires,
    }));
  } catch (err) {}
};

export const get = <T = any>(key: string) => {
  try {
    const resp = localStorage.getItem(key);

    if (!resp) return null;

    const { data, expires } = JSON.parse(resp);

    if (!expires) return data;
    else if (expires) {
      //  valid
      if (Date.now() <= expires) {
        return data;
      }

      remove(key);
    }
  } catch (err) {}

  return null;
};

export const remove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {}
};

export const clear = () => {
  try {
    localStorage.clear();
  } catch (err) {}
}

export default function <T = any>(key: string, expires = 0) {
  return {
    set: (data: T) => set(key, data, expires),
    get: () => get(key),
    remove: () => remove(key),
  };
}
