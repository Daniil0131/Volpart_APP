import type { Apartment, ApartmentReview } from "../types/apartment";

const API_URL = "";

export type User = {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
};

export async function getApartments(): Promise<Apartment[]> {
  const response = await fetch(`${API_URL}/apartments`);

  if (!response.ok) {
    throw new Error("Не удалось загрузить квартиры");
  }

  return response.json();
}

export async function getApartmentById(id: string): Promise<Apartment> {
  const response = await fetch(`${API_URL}/apartments/${id}`);

  if (!response.ok) {
    throw new Error("Квартира не найдена");
  }

  return response.json();
}

export async function createApartment(formData: FormData): Promise<Apartment> {
  const response = await fetch(`${API_URL}/apartments`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Не удалось добавить квартиру");
  }

  return data;
}

export async function deleteApartment(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/apartments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Не удалось удалить квартиру");
  }
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Не удалось зарегистрироваться");
  }

  return result.user;
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<User> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Не удалось войти");
  }

  return result.user;
}

export async function createApartmentReview(
  apartmentId: number,
  data: {
    authorId: number;
    author: string;
    text: string;
    rating: number;
  }
): Promise<ApartmentReview> {
  const response = await fetch(`${API_URL}/apartments/${apartmentId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Не удалось добавить отзыв");
  }

  return result.review;
}

export async function updateApartmentReview(
  apartmentId: number,
  reviewId: number,
  data: {
    authorId: number;
    text: string;
    rating: number;
  }
): Promise<ApartmentReview> {
  const response = await fetch(
    `${API_URL}/apartments/${apartmentId}/reviews/${reviewId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Не удалось обновить отзыв");
  }

  return result.review;
}

export async function deleteApartmentReview(
  apartmentId: number,
  reviewId: number,
  authorId: number
): Promise<void> {
  const response = await fetch(
    `${API_URL}/apartments/${apartmentId}/reviews/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authorId }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Не удалось удалить отзыв");
  }
}