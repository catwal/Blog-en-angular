import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Article} from './article';

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


    constructor() {
        this.editing = false;
        this.editArticle = new Article(0, '');
        this.title = 'BlogAngular';
        this.articles = new Array();
        //        this.articles.push(new Article(99, 'Article de test', 'Super description...'));
    }

    addArticle() {
        this.editing = true;
    }
    backToList() {
        /*JS delai le plus court possible*/
        setTimeout(() => this.editing = false);
    }
    saveArticle(myForm: NgForm) {
        /*utilisation du JSON pour serializer et deserializer le texte- permettra d'utiliser une autre adresse memoire pour eviter que le reset n'efface ce qui vien d'être tapé par le user*/
        this.articles.push(JSON.parse(JSON.stringify(this.editArticle)));
        myForm.resetForm();

    }
}
