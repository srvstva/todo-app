var app = new Vue({
    delimiters: ['[[', ']]'],
    el: '#app',
    data: {
        todos: [],
        newTodo: {
            title: "",
            completed: false,
        }
    },
    methods: {
        getAllTodos: function () {
            this.$http.get('/api/v1/todos').then(response => {
                this.todos = response.body;
            }, err => {
                console.log(err)
            });
        },
        updateTodo: function(todo) {
            var completed = todo.completed;
            var body = {completed: completed}
            this.$http.patch(`/api/v1/todos/${todo.id}`, body)
            .then(function(resp){
                console.log(resp.body);
            });
        },
        destroy: function(todoID) {
            var url = `api/v1/todos/${todoID}`;
            this.$http.delete(url, {body: {}})
            .then(function(resp) {
                this.getAllTodos();
            });
        },
        addTodo: function() {
            var title = this.newTodo.title;
            var completed = this.newTodo.completed;
            var resp = {title: title, completed: completed};
            console.log(resp);
            this.$http.post('/api/v1/todos', resp)
            .then(function(resp){
                this.todos.push(resp.body);
            })
            this.newTodo.title = "";
        }
    },
    mounted: function () {
        this.getAllTodos();
    }
});
