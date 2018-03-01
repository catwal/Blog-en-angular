import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Article} from './article';
import {ArticleService} from './article.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string;
    articles: Array<Article>;
    editing: boolean;
    editArticle: Article;


    constructor(private articleService: ArticleService) {
        this.editing = false;
        this.editArticle = new Article();
        this.title = 'BlogAngular';
        this.articles = new Array();
        //        this.articles.push(new Article(99, 'Article de test', 'Super description...'));
    }
    ngOnInit() {
        this.articleService.list().subscribe({
            next: (articles) => {
                this.articles = articles;
            },
            error: (response) => {
                console.log('Impossible de récuperer les articles dans le fichier JSON', response);
            }
        });
    }

    addArticle() {
        this.editing = true;
    }
    backToList() {
        /*JS delai le plus court possible*/
        setTimeout(() => this.editing = false);
    }
    saveArticle(myForm: NgForm) {
        if (this.editArticle.id >= 0) {
            this.articleService.update(this.editArticle).subscribe((article) => {
                let index = this.articles.findIndex((value: Article) => value.id === article.id);
                this.articles.splice(index, 1, article);
            });
        } else {
            /*utilisation du JSON pour serializer et deserializer le texte- permettra d'utiliser une autre adresse memoire pour eviter que le reset n'efface ce qui vien d'être tapé par le user*/
            //        this.articles.push(JSON.parse(JSON.stringify(this.editArticle))); au lieu de ça on fait appel a notre couche métier
            this.articleService.create(this.editArticle).subscribe((article) => this.articles.push(article));
        }
        this.editArticle.id = undefined;
        myForm.resetForm();
    }

    modifyArticle(id: number, index: number) {
        this.editArticle = this.articles[index];
        //bascule l'affichage vers le formulaire
        this.addArticle()

    }
    deleteArticle(id: number, index: number) {
        this.articles.splice(index, 1);
    }
}
