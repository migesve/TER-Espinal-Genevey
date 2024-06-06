import React, { useEffect, useState } from 'react';
import { Button } from "../../Components/Button";
import { useNavigate } from 'react-router-dom';
import { fetchDataReponsesCohorte } from '../../utils/fetchData';
import { fetchDataCohorte } from '../../utils/fetchData';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent, DatasetComponent } from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer/*, SVGRenderer*/ } from 'echarts/renderers';
import { columnsStateInitializer } from '@mui/x-data-grid/internals';
import { m } from 'framer-motion';

export const RetoursCohorte = (cohorte) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reponsesData = await fetchDataReponsesCohorte(cohorte);
                if (reponsesData.status) {
                    setError(reponsesData.status);
                } else {
                    console.log("reponsesData : ", reponsesData);
                    setData(reponsesData);
                }
            } catch (err) {
                console.error("Error:", err);
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log("data : ", data);
        
    }, [data]);

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

    return (
        <>
            <section className="flex flex-col items-center gap-1 p-4 m-5 border border-gray-200">
                <h4 className="font-semibold text-xl">Pourcentage de réussite selon la position</h4>
                <ReactEChartsCore
                    echarts={echarts}
                    option={getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    onChartReady={() => { }}
                    onEvents={{}}
                    opts={{ renderer: "canvas" }}
                />
            </section>
        </>
    );
}

