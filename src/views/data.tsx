import React from 'react';
import { Cell, Graph, Shape } from '@antv/x6'
import '@antv/x6-react-shape'
import { SettingOutlined, SyncOutlined } from '@ant-design/icons'
const { Rect, Circle } = Shape

export const data = {
    nodes: [
      {
        id: 'node1',
        x: 40,
        y: 40,
        width: 100,
        height: 40,
        attrs: {
          body: {
            fill: '#2ECC71',
            stroke: '#000',
            strokeDasharray: '10,2',
          },
          label: {
            text: 'Hello',
            fill: '#333',
            fontSize: 13,
          },
        },
      },
      {
        id: 'node2',
        x: 180,
        y: 240,
        width: 100,
        height: 40,
        attrs: {
          body: {
            fill: '#F39C12',
            stroke: '#000',
            rx: 16,
            ry: 16,
          },
          label: {
            text: 'World',
            fill: '#333',
            fontSize: 18,
            fontWeight: 'bold',
            fontVariant: 'small-caps',
          },
        },
      }
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
      },
    ],
  };

  export const r = new Rect({
    width: 70,
    height: 40,
    attrs: {
      rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
      label: { text: 'rect', fill: 'white' },
    },
    ports: {
      groups: {
        in: {
          position: 'left',
          attrs: {
            circle: {
              r: 5,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        out: {
          position: 'right',
          attrs: {
            circle: {
              r: 5,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
      items: [
        {
          id: 'port1',
          group: 'in',
        },
        {
          id: 'port2',
          group: 'out',
        },
      ]
    },
  })

  export const c = new Circle({
    width: 60,
    height: 60,
    attrs: {
      circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
      label: { text: 'circle', fill: 'white' },
    },
  })

  export const c2 = new Circle({
    width: 60,
    height: 60,
    attrs: {
      circle: { fill: '#4B4A67', 'stroke-width': 6, stroke: '#FE854F' },
      label: { text: 'circle', fill: 'white' },
    },
  })

  export const r2 = new Rect({
    width: 70,
    height: 40,
    attrs: {
      rect: { fill: '#4B4A67', stroke: '#31D0C6', strokeWidth: 6 },
      label: { text: 'rect', fill: 'white' },
    },
  })

  Graph.registerNode(
    'custom-node',
    {
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
        {
          tagName: 'g',
          children: [
            {
              tagName: 'text',
              selector: 'btnText',
            },
            {
              tagName: 'rect',
              selector: 'btn',
            },
          ],
        },
      ],
      attrs: {
        btn: {
          refX: '100%',
          refX2: -28,
          y: 4,
          width: 24,
          height: 18,
          rx: 10,
          ry: 10,
          fill: 'rgba(255,255,0,0.01)',
          stroke: 'red',
          cursor: 'pointer',
          event: 'node:delete',
        },
        btnText: {
          fontSize: 14,
          fill: 'red',
          text: 'x',
          refX: '100%',
          refX2: -19,
          y: 17,
          cursor: 'pointer',
          pointerEvent: 'none',
        },
        body: {
          fill: '#ffffff',
          stroke: '#333333',
          strokeWidth: 2,
          refWidth: '100%',
          refHeight: '100%',
        },
        label: {
          fontSize: 14,
          fill: '#333333',
          refX: '50%',
          refY: '50%',
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
        },
      },
    },
    true,
  )

  export const myShape = {
    shape: 'custom-node',
    x: -160,
    y: -60,
    width: 120,
    height: 40,
    attrs: {
      label: {
        text: 'myShape',
      },
    },
  }

  export const htmlNode = {
    x: 240,
    y: 80,
    width: 160,
    height: 60,
    shape: 'html',
    data: {
      time: new Date().toString(),
    },
    html: {
      render(node: Cell) {
        const data = node.getData() as any
        return(
          `<div style="background:#FE854F">
            <img src="logo512.png" width=20 height=20/>
            <span>${data.time}</span>
          </div>`
        )
      },
      shouldComponentUpdate(node: Cell) {
        return node.hasChanged('data')
      },
    },
  }

  export const reactNode = {
    x: -200,
    y: 0,
    data: {
      name: 'IE Databus',
      source: 'Siemens',
      time: new Date().toString(),
      detailVisiable:false,
    },
    shape: 'react-shape',
    component(node: Cell) {
      const data = node.getData() as any
      return (
        <div style = {{minWidth:'13rem', background:'#f5f5f5', border:'0.3rem solid #ededed',  padding:'0.6rem', color:'black'}}>
          <div style = {{background:'#ededed', fontSize:'1.2rem', height:'2rem'}}>
            <div style={{float:'left', paddingLeft:'0.4rem'}}>{data.name}</div>
            <SettingOutlined style={{float:'right', padding:'0.4rem'}} onClick={()=>{}}/>
            <SyncOutlined style={{float:'right', padding:'0.4rem'}} onClick={()=>{}}/>
          </div>
          {data.detailVisiable && <div style = {{background:'white'}}>{data.time}<br/>Source: {data.source}<br/>Source: {data.source}</div>}
        </div>
      )
    },
    shouldComponentUpdate(node: Cell) {
      return node.hasChanged('data')
    },
  }