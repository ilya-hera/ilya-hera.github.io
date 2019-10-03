!function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);class s{getTasks(){throw new Error("not implemented")}saveTasks(e){throw new Error("not implemented")}}class n{constructor(e,t,r=!1,s=Date.now()){this._id=e,this._title=t,this._isDone=r,this._creationMoment=s}get id(){return this._id}get title(){return this._title}get isDone(){return this._isDone}get creationMoment(){return this._creationMoment}toggle(){return this._isDone=!this._isDone}static toJSON(e){return JSON.stringify({id:e.id,title:e.title,isDone:e.isDone,creationMoment:e.creationMoment})}static fromJSON(e){let t=null;try{t=JSON.parse(e)}catch(t){throw new Error(`invalid json: ${e}`,t.message)}return new n(t.id,t.title,t.isDone,t.creationMoment)}copy(){return new n(this.id,this.title,this.isDone,this.creationMoment)}}class a{constructor(e){if(!(e instanceof s))throw new Error("stor should implements AbstractStore interface");this._store=e}async getTasks(){return await Promise.resolve(this._store.getTasks())}async getTask(e){return await Promise.resolve(this._store.getTask(e))}async createTask(e){const t=Math.random().toString(36).substr(2,16),r=new n(t,e);return await Promise.resolve(this._store.saveTask(r))}async removeTask(e){return await Promise.resolve(this._store.removeTask(e))}async updateTask(e){return e.toggle(),await Promise.resolve(this._store.updateTask(e))}}class o extends s{constructor(){super(),this._prefix="strLS"}async getTask(e){const t=`${this._prefix}${e}`,r=localStorage.getItem(t);if(!r)return Promise.reject(new Error(`there is no task with id = ${e}`));let s=null;try{s=n.fromJSON(r)}catch(t){return Promise.reject(new Error(`inpossible get task with id = ${e}`,t.message))}return Promise.resolve(s)}getTasks(){const e=[];for(let t=0;t<localStorage.length;t++){const r=localStorage.key(t);if(r.includes(this._prefix)){let t=null;try{t=n.fromJSON(localStorage.getItem(r))}catch(e){return Promise.reject(new Error(`inpossible get task with id = ${id}`,e.message))}e.push(t)}}return Promise.resolve(e)}saveTask(e){const t=`${this._prefix}${e.id}`,r=n.toJSON(e);localStorage.setItem(t,r);let s=null;try{s=n.fromJSON(localStorage.getItem(t))}catch(e){return Promise.reject(new Error(`inpossible get task with id = ${id}`,e.message))}return Promise.resolve(s)}async updateTask(e){return this.removeTask(await this.getTask(e.id)),Promise.resolve(this.saveTask(e))}removeTask(e){return localStorage.removeItem(`${this._prefix}${e.id}`),Promise.resolve({})}}class i{constructor(e,t){this._taskManager=e,this._render=t}async init(){this._render.clearTaskList(),(await this._taskManager.getTasks()).forEach(e=>{this._render.renderTask(e)})}async deleteTask(e){await this._taskManager.removeTask(e),this._render.removeTask(e)}async deleteAll(e){const t=await this._taskManager.getTasks();this._render.clearTaskList(),t.forEach(e=>{this._taskManager.removeTask(e)})}async addTask(e){this._render.clearInput(),this._render.renderTask(await this._taskManager.createTask(e))}async toggleTask(e){const t=await this._taskManager.getTask(e);this._taskManager.updateTask(t),this._render.updateTask(t)}}class c{renderTask(e){throw new Error("not implemented")}updateTask(e){throw new Error("not implemented")}removeTask(e){throw new Error("not implemented")}}class l extends c{constructor(e,t){super(),this.taskContainer=e,this.errorContainer=t}set deleteTaskFunction(e){this._deleteTaskFunction=e}set toggleTaskFunction(e){this._toggleTaskFunction=e}renderTask(e){const t=document.createElement("li"),r=document.createElement("div"),s=document.createElement("p"),n=document.createElement("div"),a=document.createElement("button"),o=document.createElement("button");t.setAttribute("class","created-task--item"),t.setAttribute("id",e.id),r.setAttribute("class","task"),s.innerText=e.title,s.setAttribute("id",e.id),s.setAttribute("class","task--content task--content_color"),n.setAttribute("class","task--action-btn-wrapper"),a.innerText="Toggle",a.setAttribute("class","task--action-btn task--action-btn_toggle toggle-btn"),o.innerText="Delete",o.setAttribute("class","task--action-btn task--action-btn_negative delete-btn"),t.addEventListener("click",t=>{const r=t.target;if("Delete"===r.innerText)this._deleteTaskFunction(e);else if("Toggle"===r.innerText){const t=e.id;this._toggleTaskFunction(t)}}),this.taskContainer.append(t),t.append(r),r.append(s),r.append(n),n.append(a),n.append(o)}updateTask(e){this.taskContainer.querySelector(`#${e.id}`).style.textDecoration="line-through"}clearTaskList(){return document.getElementById("task-item-group").innerHTML=""}clearInput(){const e=document.getElementById("task-title");return e.value="",e.focus()}removeTask(e){this.taskContainer.querySelector(`#${e.id}`).remove()}removeError(e){e.classList.remove("todo-app--input_error")}renderError(e){e.setAttribute("class","todo-app--input_error todo-app--input todo-app--input_size")}}document.getElementById("task-title").focus(),(new class{execute(){const e=new o,t=new a(e),r=document.getElementsByClassName("created-task--item-group")[0],s=document.getElementById("task-title"),n=document.getElementById("task-debug-button"),c=document.getElementById("task-deleteAll-button"),u=s,d=new l(r,u),m=new i(t,d);d.deleteTaskFunction=m.deleteTask.bind(m),d.toggleTaskFunction=m.toggleTask.bind(m),n.addEventListener("click",()=>m.init()),c.addEventListener("click",()=>m.deleteAll()),document.querySelector("#task-title").addEventListener("keypress",e=>{13===e.keyCode&&(s.value?(d.removeError(s),m.addTask(s.value)):d.renderError(u))}),document.querySelector("#task-create-button").addEventListener("click",()=>{s.value?(d.removeError(s),m.addTask(s.value)):d.renderError(u)})}}).execute()}]);