import { mkdir } from "node:fs/promises"

export async function createNewWorkspace({ name }: { name: string }) {
    await mkdir(`uploads/${name}`, { recursive: true })

}