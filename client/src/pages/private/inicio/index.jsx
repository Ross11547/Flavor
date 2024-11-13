import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, IceCream, DollarSign, Users, ShoppingBag, Clock } from 'lucide-react';

const ventasMensuales = [
  { mes: 'Ene', ventas: 4500, clientes: 850 },
  { mes: 'Feb', ventas: 5200, clientes: 920 },
  { mes: 'Mar', ventas: 6100, clientes: 1050 },
  { mes: 'Abr', ventas: 5800, clientes: 980 },
  { mes: 'May', ventas: 7200, clientes: 1200 },
  { mes: 'Jun', ventas: 8500, clientes: 1400 }
];

const saboresPopulares = [
  { sabor: 'Chocolate', cantidad: 450 },
  { sabor: 'Vainilla', cantidad: 380 },
  { sabor: 'Fresa', cantidad: 320 },
  { sabor: 'Menta', cantidad: 280 },
  { sabor: 'Oreo', cantidad: 250 }
];

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  overflow-y: scroll;
  height: 100%;
  padding: 2rem;
  background: #fff;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const IconContainer = styled.div`
  padding: 0.75rem;
  border-radius: 50%;
  background: ${props => props.bgColor || '#e6efff'};
  color: ${props => props.iconColor || '#3b82f6'};
`;

const MetricTrend = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.color || '#3b82f6'};
`;

const MetricLabel = styled.h3`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

const MetricValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.div`
  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.875rem;
    color: #666;
  }
`;

const ChartBadge = styled.div`
  background: ${props => props.bgColor || '#e6efff'};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${props => props.textColor || '#3b82f6'};
  }
`;

const ChartContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const Inicio = () => {
  return (
    <DashboardContainer>
      <Header>
        <Title>Dashboard Heladería Flavor</Title>
        <Subtitle>Monitoreo de ventas y estadísticas en tiempo real</Subtitle>
      </Header>

      <MetricsGrid>
        <MetricCard>
          <MetricHeader>
            <IconContainer bgColor="#e6efff" iconColor="#3b82f6">
              <DollarSign size={24} />
            </IconContainer>
            <MetricTrend color="#3b82f6">+12.5%</MetricTrend>
          </MetricHeader>
          <MetricLabel>Ventas Totales</MetricLabel>
          <MetricValue>$37,300</MetricValue>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <IconContainer bgColor="#e6fee6" iconColor="#10b981">
              <Users size={24} />
            </IconContainer>
            <MetricTrend color="#10b981">+8.2%</MetricTrend>
          </MetricHeader>
          <MetricLabel>Clientes Totales</MetricLabel>
          <MetricValue>6,400</MetricValue>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <IconContainer bgColor="#f3e6ff" iconColor="#8b5cf6">
              <ShoppingBag size={24} />
            </IconContainer>
            <MetricTrend color="#8b5cf6">+15.7%</MetricTrend>
          </MetricHeader>
          <MetricLabel>Pedidos Hoy</MetricLabel>
          <MetricValue>128</MetricValue>
        </MetricCard>

        <MetricCard>
          <MetricHeader>
            <IconContainer bgColor="#ffe6f0" iconColor="#ec4899">
              <Clock size={24} />
            </IconContainer>
            <MetricTrend color="#ec4899">-2.3%</MetricTrend>
          </MetricHeader>
          <MetricLabel>Tiempo Promedio</MetricLabel>
          <MetricValue>5.2 min</MetricValue>
        </MetricCard>
      </MetricsGrid>

      <ChartsGrid>
        <ChartCard>
          <ChartHeader>
            <ChartTitle>
              <h2>Ventas Mensuales</h2>
              <p>Últimos 6 meses</p>
            </ChartTitle>
            <ChartBadge bgColor="#e6efff" textColor="#3b82f6">
              <span>+18.5%</span>
            </ChartBadge>
          </ChartHeader>
          <ChartContainer>
            <ResponsiveContainer>
              <LineChart data={ventasMensuales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Ventas ($)"
                />
                <Line
                  type="monotone"
                  dataKey="clientes"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ stroke: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Clientes"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <ChartHeader>
            <ChartTitle>
              <h2>Sabores Más Vendidos</h2>
              <p>Top 5 sabores del mes</p>
            </ChartTitle>
            <ChartBadge bgColor="#f3e6ff" textColor="#8b5cf6">
              <span>Este Mes</span>
            </ChartBadge>
          </ChartHeader>
          <ChartContainer>
            <ResponsiveContainer>
              <BarChart data={saboresPopulares}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="sabor" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar
                  dataKey="cantidad"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  name="Unidades Vendidas"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCard>
      </ChartsGrid>
    </DashboardContainer>
  );
};

export default Inicio;