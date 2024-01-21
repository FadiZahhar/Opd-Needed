'use client'
import FormPlans from "@/components/FormPlans/indexar";

export default function Page({ params }: { params: { slug: string } }) {
    return(<FormPlans type= {params.slug} />)
}
