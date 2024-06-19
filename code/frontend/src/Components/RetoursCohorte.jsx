import React, { useEffect, useState } from 'react';
import { Button } from "../Components/Button";
import { useNavigate } from 'react-router-dom';
import { fetchDataReponsesCohorte } from '../utils/fetchData';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent, DatasetComponent } from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer/*, SVGRenderer*/ } from 'echarts/renderers';
import { columnsStateInitializer } from '@mui/x-data-grid/internals';
import { m } from 'framer-motion';
import { set } from 'react-hook-form';

export const RetoursCohorte = ({cohorte}) => {

    const [dataFacile, setDataFacile] = useState([]);
    const [dataDifficile, setDataDifficile] = useState([]);
    const [error, setError] = useState(null);
    const [statPosFacile, setStatPosFacile] = useState([]);
    const [statPosDifficile, setStatPosDifficile] = useState([]);
    const [statInclFacile, setStatInclFacile] = useState([]);
    const [statInclDifficile, setStatInclDifficile] = useState([]);
    const [statRepFacile, setStatRepFacile] = useState([]);
    const [statRepDifficile, setStatRepDifficile] = useState([]);

    const positionsLabels = ["OS", "OIDP", "OIDT", "OIDA", "OP", "OIGA", "OIGT", "OIGP"];
    const inclinaisonLabels = ["peu flèchie", "fortement flèchie"];
    const typesRepresentationsFacile = ["nom", "sigle", "schéma très simplifié", "schéma simplifié", "Schéma en vue antérieure", "schéma très réaliste"];
    const typesRepresentationsdifficile = ["nom", "sigle", "schéma très simplifié"];

    useEffect(() => {
        const fetchData = async () => {
            try{

                const reponsesDataFacile = await fetchDataReponsesCohorte(cohorte, 1);
                if (reponsesDataFacile.status) {
                    setError(reponsesDataFacile.status);
                } else {
                    setDataFacile(reponsesDataFacile);
                }
                
                const reponsesDataDifficile = await fetchDataReponsesCohorte(cohorte, 2);
                if (reponsesDataDifficile.status) {
                    setError(reponsesDataDifficile.status);
                } else {
                    setDataDifficile(reponsesDataDifficile);
                }
            } catch (err) {
                console.error("Error:", err);
                setError(err.message);
            }
        };
        fetchData();
    }, [cohorte]);

    useEffect(() => {
        let positions = [{ faux: 0, total: 0 }, { faux: 0, total: 0 }, { faux: 0, total: 0 }, { faux: 0, total: 0 }, { faux: 0, total: 0 }, { faux: 0, total: 0 }, { faux: 0, total: 0 }, { faux: 0, total: 0 },];
        let inclinaisons = [{ faux: 0, total: 0 }, { faux: 0, total: 0 }];
        let representations = [{total:0},{faux:0},{faux:0},{faux:0},{faux:0},{faux:0},{faux:0}];
        dataFacile.map((reponse) => {
            if (reponse.corr_nom && reponse.corr_abreviation && reponse.corr_position && reponse.corr_schema1_angle && reponse.corr_schema1_inclinaison && reponse.corr_schema2_angle && reponse.corr_schema2_inclinaison && corr_schema3_id && corr_schema4_id) {
                positions[reponse.position_id - 1].total++;
                inclinaisons[reponse.inclinaison_id-1].total++;
                
            } else {
                positions[reponse.position_id - 1].total++;
                positions[reponse.position_id - 1].faux++;
                
                inclinaisons[reponse.inclinaison_id - 1].total++;
                inclinaisons[reponse.inclinaison_id - 1].faux++;

                if(!reponse.corr_nom){
                    representations[0].total++;
                    representations[1].faux++;
                }
                if(!reponse.corr_abreviation){
                    representations[0].total++;
                    representations[2].faux++;
                }
                if(!reponse.corr_schema1_angle||!reponse.corr_schema1_inclinaison){
                    representations[0].total++;
                    representations[3].faux++;
                }
                if(!reponse.corr_schema2_angle||!reponse.corr_schema2_inclinaison){
                    representations[0].total++;
                    representations[4].faux++;
                }
                if(!reponse.corr_schema3_id){
                    representations[0].total++;
                    representations[5].faux++;
                }
                if(!reponse.corr_schema4_id){
                    representations[0].total++;
                    representations[6].faux++;
                }

            }

        });
        setStatPosFacile([(positions[0].faux/positions[0].total)*100,(positions[1].faux/positions[1].total)*100,(positions[2].faux/positions[2].total)*100,(positions[3].faux/positions[3].total)*100,(positions[4].faux/positions[4].total)*100,(positions[5].faux/positions[5].total)*100,(positions[6].faux/positions[6].total)*100,(positions[7].faux/positions[7].total)*100]);
        setStatInclFacile([(inclinaisons[0].faux/inclinaisons[0].total)*100,(inclinaisons[1].faux/inclinaisons[1].total)*100]);
        setStatRepFacile([(representations[1].faux/representations[0].total)*100,(representations[2].faux/representations[0].total)*100,(representations[3].faux/representations[0].total)*100,(representations[4].faux/representations[0].total)*100,(representations[5].faux/representations[0].total)*100,(representations[6].faux/representations[0].total)*100]);
    }, [dataFacile]);

    useEffect(() => {
        let positions = [{ faux: 0, total: 0 }, { faux: 0, total: 0 }, { faux: 0, total: 0 }, { faux: 0, total: 0 }, { faux: 0, total: 0 }, { faux: 0, total: 0 }, { faux: 0, total: 0 }, { faux: 0, total: 0 },];
        let inclinaisons = [{ faux: 0, total: 0 }, { faux: 0, total: 0 }];
        let representations = [{total:0},{faux:0},{faux:0},{faux:0},{faux:0},{faux:0},{faux:0}];
        dataDifficile.map((reponse) => {
            if (reponse.corr_nom && reponse.corr_abreviation && reponse.corr_position && reponse.corr_schema1_angle && reponse.corr_schema1_inclinaison && reponse.corr_schema2_angle && reponse.corr_schema2_inclinaison && corr_schema3_id && corr_schema4_id) {
                positions[reponse.position_id - 1].total++;
                inclinaisons[reponse.inclinaison_id-1].total++;
                
            } else {
                positions[reponse.position_id - 1].total++;
                positions[reponse.position_id - 1].faux++;
                
                inclinaisons[reponse.inclinaison_id - 1].total++;
                inclinaisons[reponse.inclinaison_id - 1].faux++;

                if(!reponse.corr_nom){
                    representations[0].total++;
                    representations[1].faux++;
                }
                if(!reponse.corr_abreviation){
                    representations[0].total++;
                    representations[2].faux++;
                }
                if(!reponse.corr_schema1_angle||!reponse.corr_schema1_inclinaison){
                    representations[0].total++;
                    representations[3].faux++;
                }
                if(!reponse.corr_schema2_angle||!reponse.corr_schema2_inclinaison){
                    representations[0].total++;
                    representations[4].faux++;
                }
                if(!reponse.corr_schema3_id){
                    representations[0].total++;
                    representations[5].faux++;
                }
                if(!reponse.corr_schema4_id){
                    representations[0].total++;
                    representations[6].faux++;
                }

            }

        });
        setStatPosDifficile([(positions[0].faux/positions[0].total)*100,(positions[1].faux/positions[1].total)*100,(positions[2].faux/positions[2].total)*100,(positions[3].faux/positions[3].total)*100,(positions[4].faux/positions[4].total)*100,(positions[5].faux/positions[5].total)*100,(positions[6].faux/positions[6].total)*100,(positions[7].faux/positions[7].total)*100]);
        setStatInclDifficile([(inclinaisons[0].faux/inclinaisons[0].total)*100,(inclinaisons[1].faux/inclinaisons[1].total)*100]);
        setStatRepDifficile([(representations[1].faux/representations[0].total)*100,(representations[2].faux/representations[0].total)*100,(representations[3].faux/representations[0].total)*100,(representations[4].faux/representations[0].total)*100,(representations[5].faux/representations[0].total)*100,(representations[6].faux/representations[0].total)*100]);
    }, [dataDifficile]);

    const getOption = (labels,donneesFacile,donneesDifficile,titre) => {
        // Return the ECharts option object here
        return {
            title: {
                text: titre
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: labels
            },
            yAxis: {},
            series: [
                {
                name: 'Exercices faciles',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: donneesFacile
                },
                {
                name: 'Exercices difficiles',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: donneesDifficile
                }
            ]
        };
    };

    return (
        <>
            <section className="flex flex-col w-full items-center gap-1 p-4 m-5">
                <h4 className="font-bold text-3xl text-black">Résultats de la cohorte : {cohorte}</h4>
                <div className='w-full my-12'>
                {statPosFacile && (<ReactEChartsCore
                    echarts={echarts}
                    option={getOption(positionsLabels,statPosFacile,statPosDifficile,"Pourcentage d'erreur selon la position et la difficulté")}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    onChartReady={() => { }}
                    onEvents={{}}
                    opts={{ renderer: "canvas" }}
                />)}
                </div>

                <div className='w-full h-4/3 my-12'>
                {statInclFacile && (<ReactEChartsCore
                    echarts={echarts}
                    option={getOption(inclinaisonLabels,statInclFacile,statInclDifficile,"Pourcentage d'erreur selon le flèchiessement et la difficulté")}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    onChartReady={() => { }}
                    onEvents={{}}
                    opts={{ renderer: "canvas" }}
                />)}
                </div>

                <div className='w-full h-4/3 my-12'>
                {statRepFacile && (<ReactEChartsCore
                    echarts={echarts}
                    option={getOption(typesRepresentationsFacile,statRepFacile,statRepDifficile,"Parts des représentations dans les erreurs selon la difficulté")}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    onChartReady={() => { }}
                    onEvents={{}}
                    opts={{ renderer: "canvas" }}
                />)}
                </div>
            </section>
        </>
    );
}

