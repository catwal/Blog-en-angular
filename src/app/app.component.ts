import {Component} from '@angular/core';

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


    constructor() {
        this.editing = false;
        this.title = 'BlogAngular';
        this.articles = new Array();
        this.articles.push(new Article(99, 'Article de test', 'Super description...'));
    }

    addArticle() {
        this.editing = true;
    }
}
