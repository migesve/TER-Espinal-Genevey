import React, { useEffect, useState } from 'react';
import { Button } from "../../Components/Button";
import { useNavigate } from 'react-router-dom';
import { fetchDataReponses } from '../../utils/fetchData';
import { fetchDataCohorte } from '../../utils/fetchData';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent, DatasetComponent } from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer/*, SVGRenderer*/ } from 'echarts/renderers';
import { columnsStateInitializer } from '@mui/x-data-grid/internals';
import { RetoursCohorte } from '../../Components/RetoursCohorte';

// Register the required components
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
);


export function RetoursEnseignant() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cohortes, setCohortes] = useState([]);
    const [view, setView] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const reponsesData = await fetchDataReponses();
                if (reponsesData.status) {
                    setError(reponsesData.status);
                } else {
                    console.log("reponsesData : ", reponsesData);
                    setData(reponsesData);
                }

                const cohorteListe = await fetchDataCohorte();
                if (cohorteListe.status) {
                    setError(cohorteListe.status);
                } else {
                    console.log("cohorteListe : ", cohorteListe);
                    setCohortes(cohorteListe);
                    setView(cohorteListe[0].cohorte);
                }
                setLoading(false);

            } catch (err) {
                console.error("Error:", err);
                setError(err.message);
                setLoading(false);
            }
        }
        fetchData();

    }, []);

    console.log("data : ", data);
    console.log("cohortes : ", cohortes);

    const onClick = (cohorte) => {
        setView(cohorte);
    }

    const getOption = () => {
        // Return the ECharts option object here
        return {
            title: {
                text: 'Retours Enseignant'
            },
            tooltip: {},
            xAxis: {
                data: ["A", "B", "C", "D", "E", "F"]
            },
            yAxis: {},
            series: [{
                name: 'Nombre de retours',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
    };

    const renderData = () => {
        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p className="text-red-500">{error}</p>;
        }

        return (
            <div className="w-fit m-auto my-10 bg-sky-50">
                {<RetoursCohorte cohorte={view}/>}
            </div>
        );
    };

    return (
        <>
            <div className="flex justify-center space-x-4">
                {cohortes.map((cohorte) => (
                    <Button key={cohorte.cohorte} onClick={() => onClick(cohorte.cohorte)} text={cohorte.cohorte} />
                ))}
            </div>
            <h1>Retours</h1>
            <div className="w-fit m-auto my-10 bg-sky-50">
        // The usage of ReactEChartsCore are same with above.
                {renderData()}

            </div>
        </>
    );
}
