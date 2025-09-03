
"use client"


import { ChartAreaInteractive } from "@/components/custom/common-sidebar/chart-area-interactive"
import { DataTable } from "@/components/custom/common-sidebar/data-table"
import { SectionCards } from "@/components/custom/common-sidebar/section-cards"

import data from "./data.json"
import { Database } from "lucide-react"
import { DisplayInnerTitle, DisplayTitle } from "@/components/common/common.components"



export default function AdminPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <DisplayTitle 
        title="Tableau de bord"
        icon={<Database className="w-10 h-10" />}
      />

      <DisplayInnerTitle 
        title="Statistiques"
        icon={<Database className="w-10 h-10" />}
      />
      <SectionCards />
      <div className="px-4 lg:px-6">
        <DisplayInnerTitle 
          title="Données"
          icon={<Database className="w-10 h-10" />}
        />
        <ChartAreaInteractive />
      </div>

      <DisplayInnerTitle  
        title="Utilisateurs"
        icon={<Database className="w-10 h-10" />}
      />
      <DataTable data={data} />
    </div>
  )
}
