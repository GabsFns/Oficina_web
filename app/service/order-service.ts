
import { cookies } from "next/headers"
import { cache } from "react"
import { prisma } from "@/lib/prisma"

export const getOrders = cache(async() => {
    'use server'
    cookies()
    const orders = await prisma.ordemService.findMany({
        orderBy: { createdAt: "desc"},
        include:{
            client: true,
            truck: true,
            orcamentos: true,
            diagnostico: true,
        }
    })
    return orders
})