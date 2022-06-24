//LOGIC

var app = new Vue({
    el: '#app',
    data: {
        users: [
            {id: 1, name: 'test1', lastname: 'lastname1', email: 'test1@example.com', pass: '1234', token: false},
        ],
        userinput: '',
        passinput: '',
        href: '#',
    },
    methods: {
        login(){
            if (this.userinput.length > 0 && this.passinput.length > 0) {
                const index = this.users.findIndex((object) => {
                    return object.email == this.userinput;
                });
    
                if(index != -1 && this.passinput === this.users[index].pass){
                    this.href = 'app.html'
                    alert('Valid user!');
                }else{
                    alert('Invalid password or email');
                }
            }else{
                alert('An email and password must be provided');
            }
        }
    },
});
