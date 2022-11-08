import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line, Area, PieConfig } from '@ant-design/plots';
import { LineConfig, AreaConfig, Pie, G2 } from '@ant-design/charts';

export const TotalUsers = (props: Partial<AreaConfig>) => {
    const data = [
        { month: '2021-08', value: 1, },
        { month: '2021-09', value: 3, },
        { month: '2021-10', value: 40, },
        { month: '2021-11', value: 44, },
        { month: '2021-12', value: 60, },
        { month: '2022-01', value: 23, },
        { month: '2022-02', value: 29, },
        { month: '2022-03', value: 35, },
        { month: '2022-04', value: 65, },
        { month: '2022-05', value: 93, },
        { month: '2022-06', value: 106, },
    ];
    const config: AreaConfig = {
        data,
        height: 150,
        xField: 'month',
        yField: 'value',
        point: {
            size: 2,
            shape: 'round',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: {
            showMarkers: false,
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'marker-active',
            },
        ],
        ...props,
    };
    return <Area {...config} />;
};

export const NewUsers = (props: Partial<AreaConfig>) => {
    const data = [
        { month: '2021-08', value: 1, },
        { month: '2021-09', value: 51, },
        { month: '2021-10', value: 35, },
        { month: '2021-11', value: 28, },
        { month: '2021-12', value: 41, },
        { month: '2022-01', value: 4, },
        { month: '2022-02', value: 0, },
        { month: '2022-03', value: 12, },
        { month: '2022-04', value: 10, },
        { month: '2022-05', value: 6, },
        { month: '2022-06', value: 1, },
    ];
    const config: AreaConfig = {
        data,
        height: 150,
        xField: 'month',
        yField: 'value',
        point: {
            size: 2,
            shape: 'round',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: {
            showMarkers: false,
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'marker-active',
            },
        ],
        ...props,
    };
    return <Area {...config} />;
}

export const TotalIssues = (props: Partial<AreaConfig>) => {
    const data = [
        { month: '2021-08', value: 230, },
        { month: '2021-09', value: 504, },
        { month: '2021-10', value: 605, },
        { month: '2021-11', value: 777, },
        { month: '2021-12', value: 1023, },
        { month: '2022-01', value: 1134, },
        { month: '2022-02', value: 1203, },
        { month: '2022-03', value: 1231, },
        { month: '2022-04', value: 1355, },
        { month: '2022-05', value: 1702, },
        { month: '2022-06', value: 1921, },
    ];
    const config: AreaConfig = {
        data,
        height: 150,
        xField: 'month',
        yField: 'value',
        point: {
            size: 2,
            shape: 'round',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: {
            showMarkers: false,
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'marker-active',
            },
        ],
        ...props,
    };
    return <Area {...config} />;
}

export const NewIssues = (props: Partial<AreaConfig>) => {
    const data = [
        { month: '2021-08', value: 123, },
        { month: '2021-09', value: 21, },
        { month: '2021-10', value: 204, },
        { month: '2021-11', value: 53, },
        { month: '2021-12', value: 40, },
        { month: '2022-01', value: 166, },
        { month: '2022-02', value: 321, },
        { month: '2022-03', value: 86, },
        { month: '2022-04', value: 152, },
        { month: '2022-05', value: 105, },
        { month: '2022-06', value: 66, },
    ];
    const config: AreaConfig = {
        data,
        height: 150,
        xField: 'month',
        yField: 'value',
        point: {
            size: 2,
            shape: 'round',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: {
            showMarkers: false,
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'marker-active',
            },
        ],
        ...props,
    };
    return <Area {...config} />;
}

export const UsersPie = () => {
    const G = G2.getEngine('canvas');
    const piedata = [
        {
            type: '厂商',
            value: 500,
        },
        {
            type: '学生',
            value: 2500,
        },
        {
            type: '教职工',
            value: 1000,
        }
    ];
    const cfg: PieConfig = {
        // appendPadding: 10,
        data: piedata,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        // legend: false,
        label: {
            type: 'outer',
            // labelHeight: 40,
            // formatter: (data, mappingData) => {
            //     const group = new G.Group({});
            //     group.addShape({
            //         type: 'circle',
            //         attrs: {
            //             x: 0,
            //             y: 0,
            //             width: 40,
            //             height: 50,
            //             r: 5,
            //             fill: mappingData.color,
            //         },
            //     });
            //     group.addShape({
            //         type: 'text',
            //         attrs: {
            //             x: 10,
            //             y: 8,
            //             text: `${data.type}`,
            //             fill: mappingData.color,
            //         },
            //     });
            //     group.addShape({
            //         type: 'text',
            //         attrs: {
            //             x: 10,
            //             y: 25,
            //             text: `${data.value}名 ${data.percent * 100}%`,
            //             fill: 'rgba(0, 0, 0, 0.65)',
            //             fontWeight: 700,
            //         },
            //     });
            //     return group;
            // },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };
    const config = cfg;
    return <Pie {...config} />;
};