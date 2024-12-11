import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp as UpIcon, 
  TrendingDown as DownIcon, 
  ShoppingCart, 
  IceCream, 
  DollarSign,
  Users,
  Package 
} from 'lucide-react';

const Colors = {
  primary: "#FF85B3",
  secondary: "#FFB8D4",
  accent: "#97E5EF",
  background: "#FFF5F8",
  text: "#4A4A4A",
  white: "#FFFFFF",
  hover: "#FFE5EE",
  gradient: "linear-gradient(135deg, #FF85B3 0%, #FFB8D4 100%)",
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    
    color: ${Colors.text};
  }
`;

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  max-width: 1600px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: ${Colors.white};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(255,133,179,0.1);
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(255,133,179,0.2);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${Colors.text};
  font-size: 16px;
  font-weight: 600;
`;

const MetricValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${Colors.primary};
  background: ${Colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TrendIndicator = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.positive ? '#27AE60' : '#E74C3C'};
  font-size: 14px;
`;

const DashboardTitle = styled.h1`
  text-align: center;
  color: ${Colors.text};
  margin: 20px 0;
  font-weight: 700;
`;

// Sample Data Generation
const generateVentasPorSabor = () => [
  { sabor: 'Chocolate', ventas: 450 },
  { sabor: 'Vainilla', ventas: 350 },
  { sabor: 'Fresa', ventas: 300 },
  { sabor: 'Menta', ventas: 250 },
  { sabor: 'Caramelo', ventas: 200 }
];

const generateVentasMensuales = () => [
  { mes: 'Ene', ventas: 3500 },
  { mes: 'Feb', ventas: 4200 },
  { mes: 'Mar', ventas: 3800 },
  { mes: 'Abr', ventas: 4500 },
  { mes: 'May', ventas: 5000 },
  { mes: 'Jun', ventas: 4800 }
];

const generateClientesPorDia = () => [
  { dia: 'Lun', clientes: 120 },
  { dia: 'Mar', clientes: 150 },
  { dia: 'Mié', clientes: 180 },
  { dia: 'Jue', clientes: 200 },
  { dia: 'Vie', clientes: 250 },
  { dia: 'Sáb', clientes: 300 },
  { dia: 'Dom', clientes: 280 }
];

const generateIngredientesStock = () => [
  { ingrediente: 'Leche', stock: 85 },
  { ingrediente: 'Crema', stock: 70 },
  { ingrediente: 'Fruta', stock: 60 },
  { ingrediente: 'Chocolate', stock: 50 },
  { ingrediente: 'Nueces', stock: 40 }
];

const Inicio = () => {
  const [ventasPorSabor, setVentasPorSabor] = useState([]);
  const [ventasMensuales, setVentasMensuales] = useState([]);
  const [clientesPorDia, setClientesPorDia] = useState([]);
  const [ingredientesStock, setIngredientesStock] = useState([]);

  useEffect(() => {
    setVentasPorSabor(generateVentasPorSabor());
    setVentasMensuales(generateVentasMensuales());
    setClientesPorDia(generateClientesPorDia());
    setIngredientesStock(generateIngredientesStock());
  }, []);

  const CHART_COLORS = [
    Colors.primary, 
    Colors.secondary, 
    Colors.accent, 
    '#6C5CE7', 
    '#FFC312'
  ];

  return (
    <ThemeProvider theme={{ Colors }}>
      <>
        <GlobalStyle />
        <DashboardTitle>Tablero de Control - Heladería Flavor</DashboardTitle>
        <DashboardContainer>
          <Card>
            <CardHeader>
              <CardTitle>Ventas Totales</CardTitle>
              <DollarSign color={Colors.primary} />
            </CardHeader>
            <MetricValue>$45,678</MetricValue>
            <TrendIndicator positive={true}>
              <UpIcon size={18} /> 12.5% vs mes anterior
            </TrendIndicator>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Productos Vendidos</CardTitle>
              <ShoppingCart color={Colors.primary} />
            </CardHeader>
            <MetricValue>1,234</MetricValue>
            <TrendIndicator positive={false}>
              <DownIcon size={18} /> 5.2% vs mes anterior
            </TrendIndicator>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clientes Diarios</CardTitle>
              <Users color={Colors.primary} />
            </CardHeader>
            <MetricValue>256</MetricValue>
            <TrendIndicator positive={true}>
              <UpIcon size={18} /> Promedio semanal
            </TrendIndicator>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sabor Más Popular</CardTitle>
              <IceCream color={Colors.primary} />
            </CardHeader>
            <MetricValue>Chocolate</MetricValue>
            <TrendIndicator positive={true}>
              <UpIcon size={18} /> Líder de ventas
            </TrendIndicator>
          </Card>

          <Card style={{ gridColumn: 'span 2' }}>
            <CardTitle>Ventas por Sabor de Helado</CardTitle>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ventasPorSabor}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="ventas"
                >
                  {ventasPorSabor.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card style={{ gridColumn: 'span 2' }}>
            <CardTitle>Ventas Mensuales</CardTitle>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={ventasMensuales}>
                <CartesianGrid strokeDasharray="3 3" stroke={Colors.secondary} />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="ventas" 
                  fill={Colors.primary} 
                  fillOpacity={0.3} 
                  stroke={Colors.primary} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card style={{ gridColumn: 'span 2' }}>
            <CardTitle>Flujo de Clientes Diario</CardTitle>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={clientesPorDia}>
                <CartesianGrid strokeDasharray="3 3" stroke={Colors.secondary} />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="clientes" 
                  stroke={Colors.accent} 
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card style={{ gridColumn: 'span 2' }}>
            <CardTitle>Stock de Ingredientes</CardTitle>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ingredientesStock}>
                <CartesianGrid strokeDasharray="3 3" stroke={Colors.secondary} />
                <XAxis dataKey="ingrediente" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="stock" 
                  fill={Colors.secondary} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </DashboardContainer>
      </>
    </ThemeProvider>
  );
};

export default Inicio;