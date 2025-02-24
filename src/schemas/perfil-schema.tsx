import { z } from "zod";

export const formPerfilSchema = z.object({
  nome: z.string().min(1, {
    message: "Campo obrigatório.",
  }),
  email: z
    .string()
    .email("Por favor, insira um e-mail válido")
    .nonempty("E-mail é obrigatório"),
  dateCreated: z.string().optional(),
  sexo: z.string().min(1, {
    message: "Campo obrigatório.",
  }),
  telefone: z.string().min(9, {
    message: "Campo obrigatório.",
  }),
  cep: z.string().min(8, {
    message: "Campo obrigatório.",
  }),
  logradouro: z.string().min(1, {
    message: "Campo obrigatório.",
  }),
  bairro: z.string().min(1, {
    message: "Campo obrigatório.",
  }),
  cidade: z.string().min(1, {
    message: "Campo obrigatório.",
  }),
  estado: z.string().min(1, {
    message: "Campo obrigatório.",
  }),
  numero: z.string().min(1, {
    message: "Campo obrigatório.",
  }),
  complemento: z.string().optional(),
});
