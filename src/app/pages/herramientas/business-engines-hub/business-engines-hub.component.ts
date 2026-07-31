import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

interface BusinessEngine {
  title: string;
  description: string;
  icon: string;
  spreadsheetUrl: string;
  category: 'finanzas' | 'operaciones' | 'comercial' | 'direccion';
}

@Component({
  selector: 'app-business-engines-hub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-engines-hub.component.html',
  styleUrls: ['./business-engines-hub.component.css']
})
export class BusinessEnginesHubComponent implements OnInit {
  public selectedCategory: string = 'all';
  public searchQuery: string = '';

  public engines: BusinessEngine[] = [
    {
      title: 'Control de Tesorería',
      description: 'Gestiona ingresos, gastos, saldo, previsiones de caja y liquidez real de la empresa en tiempo real.',
      icon: '💰',
      spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1uZgqh2kEyOuBBi_FK81VbuQY_2w58EHacEHu6HRSOpA/edit',
      category: 'finanzas'
    },
    {
      title: 'Previsión de Caja',
      description: 'Simula la tesorería futura de tu negocio en función de los cobros y pagos previstos a corto y medio plazo.',
      icon: '📈',
      spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1eTR-k-e4nUToRTF-fXlIhAopJ3f_QQwtDQd3V7ijKNM/edit',
      category: 'finanzas'
    },
    {
      title: 'Control de Ventas',
      description: 'Registra clientes, oportunidades de negocio, presupuestos enviados y un completo seguimiento comercial.',
      icon: '🤝',
      spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1_MyI5GJR8uNU9sfh4VYnmOdOsOTsgzciIJXXsvkBe6o/edit',
      category: 'comercial'
    },
    {
      title: 'Inventario Inteligente',
      description: 'Controla existencias, entradas, salidas, stock mínimo de seguridad y alertas de reposición automática.',
      icon: '📦',
      spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1NVZ_9kFLhRw76UOaAn_sERk2LlWsoI6fwW_oDuTPIYg/edit',
      category: 'operaciones'
    },
    {
      title: 'Compras y Proveedores',
      description: 'Gestiona pedidos a proveedores, desglose de costes, plazos de entrega e histórico de compras acumulado.',
      icon: '🛒',
      spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1Nfih0V-fc9-mDVsOYrlbU4CXn5mUdf5sWftuHDEoJJY/edit',
      category: 'operaciones'
    },
    {
      title: 'Control de Producción',
      description: 'Planifica órdenes de fabricación, tiempos de proceso, materias primas necesarias y rendimiento de planta.',
      icon: '⚙️',
      spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1kD2NYWNzKkin7UG6Aj854pWAjflGD7H7OvjjmNK_yGI/edit',
      category: 'operaciones'
    },
    {
      title: 'Rentabilidad de Clientes',
      description: 'Descubre qué clientes generan más beneficio neto teniendo en cuenta costes de servicio, soporte e incidencias.',
      icon: '👑',
      spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1Z09fGMSNvpDuWN_XqLVS5zwGRgVgICcHPq9d73sSDFQ/edit',
      category: 'finanzas'
    },
    {
      title: 'Costes de Proyectos',
      description: 'Controla de forma rigurosa las horas invertidas, materiales, gastos directos y margen económico por cada proyecto.',
      icon: '🏗️',
      spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1KmhXYkZyy0TtQL2WeVpwLM9KtodVOvujPIYY3BdKgAU/edit',
      category: 'operaciones'
    },
    {
      title: 'Control de Personal',
      description: 'Organiza empleados, control de vacaciones, turnos, horas trabajadas y métricas globales de productividad.',
      icon: '👥',
      spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/12crojhP-vz71kTYF0liUdA447WfIft9Vg1oXP_lrPDE/edit',
      category: 'operaciones'
    },
    {
      title: 'Panel de Dirección',
      description: 'Dashboard ejecutivo con indicadores clave (KPIs), gráficos consolidados y la evolución general del negocio.',
      icon: '📊',
      spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1hzj6JR83Q_FS-OFjw0E4bn_y-tRV-14WRAzeIMBXnac/edit',
      category: 'direccion'
    }
  ];

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle('Plantillas ERP y Hojas de Negocio | Google Sheets | BaluArte Tech');
    this.metaService.updateTag({
      name: 'description',
      content: 'Colección de plantillas ERP avanzadas para Google Sheets: tesorería, ventas, producción, control de proyectos y BI ejecutivo.'
    });
  }

  public get filteredEngines(): BusinessEngine[] {
    return this.engines.filter(engine => {
      const matchesCategory = this.selectedCategory === 'all' || engine.category === this.selectedCategory;
      const matchesSearch = engine.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        engine.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  public setCategory(category: string): void {
    this.selectedCategory = category;
  }
}