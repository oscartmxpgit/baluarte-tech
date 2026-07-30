import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

interface Tool {
  title: string;
  description: string;
  icon: string;
  route: string;
  category: 'finanzas' | 'documentos' | 'marketing' | 'productividad';
}

@Component({
  selector: 'app-herramientas-hub',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './herramientas-hub.component.html',
  styleUrls: ['./herramientas-hub.component.css']
})
export class HerramientasHubComponent implements OnInit {
  public selectedCategory: string = 'all';
  public searchQuery: string = '';

  public tools: Tool[] = [
    {
      title: 'Calculadora de ROI y Ahorro',
      description: 'Mide cuánto dinero y horas al año puedes ahorrar automatizando las tareas repetitivas de tu negocio.',
      icon: '📊',
      route: '/herramientas/calculadora-roi-automatizacion',
      category: 'productividad'
    },
    {
      title: 'Calculadora de Margen y Precio',
      description: 'Calcula el precio de venta ideal y el beneficio bruto aplicando porcentajes de margen sobre los costes.',
      icon: '🏷️',
      route: '/herramientas/calculadora-margen-beneficio',
      category: 'finanzas'
    },
    {
      title: 'Calculadora de Comisiones',
      description: 'Descubre el dinero neto exacto que recibes tras las comisiones de Stripe, Bizum o TPV bancario.',
      icon: '💳',
      route: '/herramientas/calculadora-comisiones',
      category: 'finanzas'
    },
    {
      title: 'Generador de Link WhatsApp',
      description: 'Crea enlaces directos con mensaje predefinido para tus clientes sin necesidad de que guarden tu teléfono.',
      icon: '💬',
      route: '/herramientas/generador-link-whatsapp',
      category: 'marketing'
    },
    {
      title: 'Generador de QR para Wi-Fi',
      description: 'Crea un código QR para que tus clientes se conecten a la red Wi-Fi de tu local al instante sin teclear contraseñas.',
      icon: '📶',
      route: '/herramientas/generador-qr-wifi',
      category: 'marketing'
    },
    {
      title: 'Limpiador de Datos Excel',
      description: 'Limpia espacios duplicados, elimina líneas vacías y formatea listas de datos copiadas desde hojas de cálculo.',
      icon: '🧹',
      route: '/herramientas/limpiador-datos-excel',
      category: 'productividad'
    },
    {
      title: 'Generador de Facturas Express',
      description: 'Crea facturas profesionales en PDF con desglose de impuestos e información fiscal listas para descargar.',
      icon: '🧾',
      route: '/herramientas/generador-facturas-express',
      category: 'documentos'
    },
    {
      title: 'Generador de Presupuestos Express',
      description: 'Genera presupuestos claros en PDF para enviar rápidamente a tus clientes por WhatsApp o correo.',
      icon: '📋',
      route: '/herramientas/generador-presupuestos-express',
      category: 'documentos'
    },
    {
      title: 'Generador de Albaranes',
      description: 'Documenta entregas de material o servicios prestados con un albarán en PDF listo para firmar.',
      icon: '📦',
      route: '/herramientas/generador-albaranes-express',
      category: 'documentos'
    },
    {
      title: 'Registro Horario Laboral (PDF)',
      description: 'Genera hojas mensuales de control de horario de empleados listas para imprimir y firmar según normativa.',
      icon: '⏱️',
      route: '/herramientas/generador-registro-horario',
      category: 'documentos'
    },
    {
      title: 'Carteles de Horarios y Festivos',
      description: 'Diseña avisos imprimibles o en imagen para comunicar cambios de horario, vacaciones o días festivos en tu local.',
      icon: '📅',
      route: '/herramientas/generador-carteles-horarios',
      category: 'documentos'
    },
    {
      title: 'Generador QR para Reseñas Google',
      description: 'Crea un código QR directo a tu ficha de Google Maps para multiplicar las valoraciones positivas de tu local.',
      icon: '⭐',
      route: '/herramientas/generador-qr-resenas-google',
      category: 'marketing'
    },
    {
      title: 'Calculadora de IVA e IRPF',
      description: 'Calcula y desglosa fácilmente las bases imponibles, retenciones e impuestos para tus presupuestos y facturas.',
      icon: '🧮',
      route: '/herramientas/calculadora-iva-irpf',
      category: 'finanzas'
    },
    {
      title: 'Calculadora de Punto de Equilibrio',
      description: 'Descubre la facturación mínima mensual que necesita tu negocio para cubrir costes fijos y no perder dinero.',
      icon: '⚖️',
      route: '/herramientas/calculadora-punto-equilibrio',
      category: 'finanzas'
    },
    {
      title: 'Calculadora de Tarifa por Hora',
      description: 'Determina cuánto debes cobrar por hora de trabajo considerando tu sueldo deseado, gastos e impuestos.',
      icon: '⌛',
      route: '/herramientas/calculadora-tarifa-hora',
      category: 'finanzas'
    }
  ];

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Herramientas Gratuitas para PYMEs y Comercios | BaluArte Tech');
    this.metaService.updateTag({
      name: 'description',
      content: 'Colección de herramientas prácticas y gratuitas para autónomos y PYMEs: facturas, albaranes, calculadoras financieras y marketing local.'
    });
  }

  public get filteredTools(): Tool[] {
    return this.tools.filter(tool => {
      const matchesCategory = this.selectedCategory === 'all' || tool.category === this.selectedCategory;
      const matchesSearch = tool.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            tool.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  public setCategory(category: string): void {
    this.selectedCategory = category;
  }
}