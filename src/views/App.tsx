import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined} from '@ant-design/icons';
import { Graph, Addon } from '@antv/x6';
import '@antv/x6-react-shape'
import { data, r, c, r2, c2, htmlNode, reactNode} from './data';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class App extends React.Component { 
  private container!: HTMLDivElement
  private stencilContainer!: HTMLDivElement

  componentDidMount() {
    const graph = new Graph({
      //container: document.getElementById('container') as HTMLElement,
      container: this.container,
      //width: this.container.offsetWidth,
      //height: this.container.offsetHeight,
      background: {
        color: '#e3fcfe4f', 
      },
      history: true,
      snapline: {
        enabled: true,
        sharp: true,
      },
      panning: {
        enabled: true,
        modifiers: 'shift',
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
      grid: {
        size: 10,     
        visible: true, 
      },
      connecting: {
        allowBlank: true,
      },
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true,
      },
    });

    // graph.fromJSON(data);
    const source = graph.addNode(data.nodes[0]);
    const target = graph.addNode(data.nodes[1]);
    graph.addEdge({source:source, target:target, label: 'edge'});
    //graph.addNode(myShape);
    graph.addNode(htmlNode);
    graph.addNode(reactNode).setData({name: 'IE App'}).setPosition({x:-200,y:-150});
    graph.addNode(reactNode).setData({name: 'IE Databus'}).setPosition({x:-200,y:0});
    graph.addNode(reactNode).setData({name: 'Device App'}).setPosition({x:-200,y:150});
    graph.centerContent();

    graph.on('cell:mouseenter', ({ cell }) => {
      if (cell.isNode()) {
        cell.addTools([
          {
            name: 'button-remove',
            args: {
              x: 0,
              y: 0,
              offset: { x: 10, y: 10 },
            },
          },
        ]);
      } else {
        cell.addTools(['vertices', 'segments', 'button-remove'])
      }
    })
    
    graph.on('cell:mouseleave', ({ cell }) => {
      cell.removeTools()
    })

    graph.on('cell:click', ({ cell }) => {
      if (cell.isNode() && cell.getData()) {
        const data = cell.getData() as any;
        if(data.detailVisiable === false || true){
          cell.setData({detailVisiable: !data.detailVisiable});
        }
      } 
    })

    const stencil = new Addon.Stencil({
      title: 'Shapes',
      target: graph,
      search:(cell, keyword)  => {
        const name = cell.attr('label/text') as String
        return (cell.shape.indexOf(keyword) !== -1 || name.includes(keyword))
      },
      placeholder: 'Search by shape name',
      notFoundText: 'Not Found',
      collapsable: true,
      stencilGraphWidth: this.stencilContainer.offsetWidth,
      stencilGraphHeight: this.stencilContainer.offsetHeight,
      groups: [
        {
          name: 'group1',
          title: 'Group1',
          graphHeight: 180, 
        },
        {
          name: 'group2',
          title: 'Group2',
          graphHeight: 90,
        },
      ],
    })

    this.stencilContainer.appendChild(stencil.container)
    stencil.load([r, c, data.nodes[0], data.nodes[1]], 'group1')
    stencil.load([c2.clone(), r2], 'group2')
  }


  refContainer = (container: HTMLDivElement) => {
    this.container = container
  }
  refStencil = (container: HTMLDivElement) => {
    this.stencilContainer = container
  }

  render(){

    return (
      <>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={300} className="site-layout-background" style={{height:'33rem', overflowX: 'hidden', overflowY: 'auto'}}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '33rem', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1" >
                <Menu.Item key="1" style={{height:420}}>
                  <div className="app-stencil" ref={this.refStencil}></div>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>Graph</Breadcrumb.Item>
            </Breadcrumb>
            <Content className="site-layout-background"
              style={{
                padding: '1rem',
                margin: 0,
                width: '100%',
                height: '30rem',
              }}>
              <div id="container" ref={this.refContainer} style={{width:'60.5rem', height:'28rem'}}></div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      </>
      );
  }
}

