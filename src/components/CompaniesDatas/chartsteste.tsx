"use client"
import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

export default function CompsCharts({ metric }: { metric: any }) {
  const dataVertical: any = {
    labels: ["Base Total", "Novo", "Em Contato", "Em Atendimento", "Venda", "Agendamento", "Stopped", "Erro"],
    datasets: [
      {
        label: "Leads",
        backgroundColor: ["#e0234e", "#36A2EB", "#ffa726", "#17a2b8", "#0b922f", "#03af67c8", "#c3002d", "#ff5722c9"],
        data: [metric.total, metric.NOVO, metric.STARTED, metric.REPLIED, metric.SCHEDULED, metric.NOTSCHEDULED, metric.STOPPED, metric.ERRO, metric.INVALIDNUMBER],
      },
    ],
  };

  const optionsVertical: any = {
    scales: {
      x: {
        type: "category",
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Estatísticas de Leads (Vertical)",
      },
    },
  };

  const dataHorizontal: any = {
    labels: ["Base Total", "Novo", "Em Contato", "Em Atendimento", "Venda", "Agendamento", "Stopped", "Erro"],
    //labels: ["Base Total","Novo", "Started","Replied","Scheduled", "NotScheduled","Stopped","Erro"],
    datasets: [
      {
        label: "Leads",
        backgroundColor: ["#e0234e", "#36A2EB", "#ffa726", "#17a2b8", "#0b922f", "#03af67c8", "#c3002d", "#ff5722c9"],
        data: [metric.total, metric.NOVO, metric.STARTED, metric.REPLIED, metric.SCHEDULED, metric.NOTSCHEDULED, metric.STOPPED, metric.ERRO],
      },
    ],
  };

  const optionsHorizontal: any = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        type: "category",
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Estatísticas de Leads (Horizontal)",
      },
    },
  };

  return (
    <>

      <div className="w-full p-10">
        <Bar data={dataHorizontal} options={optionsHorizontal} />
      </div>

    </>
  );
}
