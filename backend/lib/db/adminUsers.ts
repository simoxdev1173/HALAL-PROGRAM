import type { AdminRole } from "@prisma/client";
import { prisma } from "../prisma";
import type { AdminUser, AdminUserSafe } from "./types";

export async function getAdminByEmail(email: string): Promise<AdminUser | null> {
  return prisma.adminUser.findUnique({ where: { email } });
}

export async function getAdminById(id: string): Promise<AdminUser | null> {
  return prisma.adminUser.findUnique({ where: { id } });
}

export async function createAdminUser(data: {
  email: string;
  name: string;
  role: AdminRole;
  passwordHash: string;
}): Promise<AdminUser> {
  return prisma.adminUser.create({ data });
}

export async function updateLastLogin(id: string): Promise<AdminUser> {
  return prisma.adminUser.update({
    where: { id },
    data: { lastLoginAt: new Date() },
  });
}

export async function listAdminUsers(): Promise<AdminUserSafe[]> {
  return prisma.adminUser.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      lastLoginAt: true,
      createdAt: true,
      isActive: true,
    },
    orderBy: { name: "asc" },
  });
}
