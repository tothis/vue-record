import { get } from '@/util/http'

export async function pdf() {
    return await get('api/pdf')
}
