import { Component, OnInit, Inject } from '@angular/core'; 
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ViewportScroller, DOCUMENT } from '@angular/common'; 
import { Title, Meta } from '@angular/platform-browser'; 
import { environment } from '../../../environments/environment';
import { marked } from 'marked';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class PostComponent implements OnInit {
  htmlContent: string = '';
  prevPost: any;
  nextPost: any;

  private readonly posts = [
    { 
      slug: 'rentabilidad', 
      title: '10 acciones prácticas para mejorar la rentabilidad de tu negocio',
      image: 'assets/images/rentabilidad-exito.jpg'
    },
    { 
      slug: 'sheets-backend', 
      title: 'Por qué una simple hoja de cálculo puede ser el mejor programa para tu negocio',
      image: 'assets/images/sheets-conexion.jpg'
    },
    { 
      slug: 'seo-identidad', 
      title: 'Si no apareces en el móvil de tu cliente, se irá a la competencia',
      image: 'assets/images/google-maps-local.jpg'
    }
  ];

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private scroller: ViewportScroller,
    private titleService: Title, 
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document 
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const slug = params['slug'];
      const currentPost = this.posts.find(p => p.slug === slug);
      
      this.calculateNavigation(slug);
      this.scroller.scrollToPosition([0, 0]);

      if (currentPost) {
        const baseUrl = environment.baseUrl; 
        const postTitle = `${currentPost.title} | Baluarte Tech`;
        const postDescription = `Consejos prácticos sobre: ${currentPost.title}. Optimizando la gestión y presencia digital en nuestra comarca.`;
        const postUrl = `${baseUrl}/blog/${slug}`;
        const postImage = `${baseUrl}/${currentPost.image}`;

        // 1. SEO Estándar
        this.titleService.setTitle(postTitle);
        this.metaService.updateTag({ name: 'description', content: postDescription });

        // 2. Open Graph (Redes Sociales y WhatsApp)
        this.metaService.updateTag({ property: 'og:title', content: postTitle });
        this.metaService.updateTag({ property: 'og:description', content: postDescription });
        this.metaService.updateTag({ property: 'og:type', content: 'article' });
        this.metaService.updateTag({ property: 'og:url', content: postUrl });
        this.metaService.updateTag({ property: 'og:image', content: postImage });

        // 3. Twitter / X Cards
        this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.metaService.updateTag({ name: 'twitter:title', content: postTitle });
        this.metaService.updateTag({ name: 'twitter:description', content: postDescription });
        this.metaService.updateTag({ name: 'twitter:image', content: postImage });

        // 4. URL Canónica
        const existingCanonical = this.document.head.querySelector('link[rel="canonical"]');
        if (existingCanonical) {
          this.document.head.removeChild(existingCanonical);
        }
        const link: HTMLLinkElement = this.document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', postUrl);
        this.document.head.appendChild(link);

        // 5. Datos Estructurados dinámicos (JSON-LD)
        // Eliminamos el script de esquema anterior si ya existía para evitar duplicados
        const existingSchema = this.document.getElementById('json-ld-schema');
        if (existingSchema) {
          this.document.head.removeChild(existingSchema);
        }

        // Construimos el objeto del Schema con los datos del post actual
        const schemaData = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": currentPost.title,
          "image": postImage,
          "url": postUrl,
          "author": {
            "@type": "Organization",
            "name": "Baluarte Tech"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Baluarte Tech",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/assets/images/logo.png` // Asegúrate de que esta ruta a tu logo exista
            }
          },
          "description": postDescription
        };

        // Creamos e inyectamos la etiqueta <script> en el head
        const script = this.document.createElement('script');
        script.id = 'json-ld-schema';
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schemaData);
        this.document.head.appendChild(script);
      }

      this.http.get(`assets/posts/${slug}.md`, { responseType: 'text' })
        .subscribe(async (md) => {
          this.htmlContent = await marked(md);
        });
    });
  }

  private calculateNavigation(currentSlug: string) {
    const index = this.posts.findIndex(p => p.slug === currentSlug);
    if (index === -1) return;

    this.prevPost = this.posts[(index - 1 + this.posts.length) % this.posts.length];
    this.nextPost = this.posts[(index + 1) % this.posts.length];
  }
}