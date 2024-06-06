export const fetchDataPosition = async () => {

  const setsResponse = await fetch('http://localhost:4000/sets/getAll', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!setsResponse.ok) {
    throw new Error('Failed to fetch sets');
  }

  const setsData = await setsResponse.json();
  if (setsData.status) {
    return setsData;
  }

  return setsData.sets;
};

export const fetchDataInclinaison = async () => {
  const inclinaisonsResponse = await fetch('http://localhost:4000/inclinaison/getAll', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!inclinaisonsResponse.ok) {
    throw new Error('Failed to fetch inclinaisons');
  }

  const inclinaisonsData = await inclinaisonsResponse.json();
  if (inclinaisonsData.status) {
    return inclinaisonsData;
  }

  return inclinaisonsData.inclinaisons;

};

export async function fetchDataSchema3(position_id, inclinaison_id) {
  const response = await fetch(
    `http://localhost:4000/schema3/getByIds/${position_id}/${inclinaison_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch schema3");
  }

  const data = await response.json();
  return data;
}

export async function fetchDataSchema4(position_id, inclinaison_id) {
  const response = await fetch(
    `http://localhost:4000/schema4/getByIds/${position_id}/${inclinaison_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch schema4");
  }

  const data = await response.json();
  return data;
}

export const fetchDataReponses = async () => {
  const listeResponses = await fetch('http://localhost:4000/reponses/getAll', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!listeResponses.ok) {
    throw new Error('Failed to fetch reponses');
  }

  const reponsesData = await listeResponses.json();
  if (reponsesData.status) {
    return reponsesData;
  }

  return reponsesData.reponses;
};

export const fetchDataCohorte = async () => {
  const listeCohorte = await fetch('http://localhost:4000/reponses/getCohortes', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!listeCohorte.ok) {
    throw new Error('Failed to fetch reponses');
  }

  const cohorteData = await listeCohorte.json();
  if (cohorteData.status) {
    return cohorteData;
  }

  return cohorteData.reponses;
};

export const fetchDataReponsesCohorte = async (cohorte) => {
  const listeCohorte = await fetch(`http://localhost:4000/reponses/getByCohorte/${cohorte}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!listeCohorte.ok) {
    throw new Error('Failed to fetch reponses');
  }

  const cohorteData = await listeCohorte.json();
  if (cohorteData.status) {
    return cohorteData;
  }

  return cohorteData.reponses;
};