//LOGIC

var app = new Vue({
    el: '#app',
    data: {
        users: [
            {id: 1, name: 'test1', lastname: 'lastname1', email: 'test1@example.com', pass: '1234', token: false},
        ],
        newArrUsers: [],
        pets: [
            {id: 1, name: 'Pipo', race: 'Creole', age: 1, status: false}
        ],
        userinput: '',
        passinput: '',
        href: '#',
        pos: '',
    },
    methods: {
        login(){
            if (this.userinput.length > 0 && this.passinput.length > 0) {
                const index = this.users.findIndex((object) => {
                    return object.email == this.userinput;
                });
    
                if(index != -1 && this.passinput === this.users[index].pass){
                    this.pos = index;
                    this.href = 'app.html'
                    this.newArrUsers[index].token = true;
                    this.updateLocalStorage();
                    alert('Valid user!');
                }else{
                    alert('Invalid password or email');
                }
            }else{
                alert('An email and password must be provided');
            }
        },
        listData(){
            this.newArrUsers = this.users;
        },
        updateLocalStorage(){
            localStorage.setItem('users', JSON.stringify(this.newArrUsers));
            localStorage.setItem('pos', JSON.stringify(this.pos));
        },
    },
    created(){
        if (localStorage.getItem('users') !== null) {
            this.newArrUsers = JSON.parse(localStorage.getItem('users'));
            this.pos = JSON.parse(localStorage.getItem('pos'));
        }else{
            this.listData();
            this.pos = this.pos
        }
    }
});
