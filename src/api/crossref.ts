export async function getPolarPublications() {
  const response = await fetch(
    'https://api.crossref.org/v1/works?query=polar%20research&rows=10'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch publications from Crossref');
  }

  const data = await response.json();

  return data.message.items;
}