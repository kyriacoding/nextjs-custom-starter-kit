
export type UserAuthModel = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  token: string;
  role: string;
};

export type UserAuthResponse = {
    success: boolean;
    total: number;
    message: string;
    error: string;
    data: UserAuthModel | null | {};
};

export type UsersListModel = {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    phone: string;
    role: string;
    statut: string;
    createdAt: Date;
    updatedAt: Date;
    fullName: string;
}

export type UsersListResponse = {
    success: boolean;
    total: number;
    message: string;
    error: string;
    data: UsersListModel[] | null | {};
};
