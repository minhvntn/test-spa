import _isEmpty from 'lodash.isempty';
import _xor from 'lodash.xor';
import { baseUrl } from '../utils/config';

const storage = {};

function isNotEmpty(value) {
  return !_isEmpty(value);
}

async function get(url) {
  const res = await fetch(url);
  const json = await res.json();

  return json;
}

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

function toggle(array, item) {
  return _xor(array, [item]);
}

async function post(url, data = {}) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const text = res.text();

  if (!text.length) return res.ok;

  const json = await res.json();

  return json;
}

async function proxy(url, data = {}) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) return;

  const json = await res.json();

  return json;
}

async function proxyWithoutResponse(url, data = {}) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

function replace(template, data) {
  const pattern = /{\s*(\w+?)\s*}/g; // {property}

  return template.replace(pattern, (_, token) => data[token] || '');
}

function id() {
  return Math.random().toString(36).slice(-4);
}

export { storage, isNotEmpty, get, clone, toggle, post, proxy, proxyWithoutResponse, replace, id };

export function getImageUrl(image) {
  let imageLink = '#';
  if (!image) return imageLink;
  if (image['@link']) {
    if (image['@link'].indexOf('http') > -1) {
      return image['@link'];
    } else {
      imageLink = baseUrl + image['@link'];
    }
  } else {
    imageLink = baseUrl + '/dam/' + image;
  }

  return imageLink;
}
