'use client'
import FormPlans from "@/components/FormPlans";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { slug: string } }) {
    return(<FormPlans type= {params.slug} />)
}
