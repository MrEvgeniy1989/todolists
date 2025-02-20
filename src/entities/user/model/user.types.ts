import { TodolistDBT } from "@/entities/todolist/model/todolist.types";

export type EmailConfirmationT = {
  confirmationCode: string;
  expirationDate: Date;
  isConfirmed: boolean;
};

export type UserT = {
  id: string;
  login: string;
  email: string;
  avatarUrl?: string;
  todolists: TodolistDBT[];
  emailConfirmation: EmailConfirmationT;
}