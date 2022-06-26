//LOGIC

var app = new Vue({
    el: '#app',
    data: {
        users: [
            {id: 1, name: 'test1', lastname: 'lastname1', email: 'test1@example.com', pass: '1234', token: false},//change the token to false when you're working into app.html
        ],
        newArrUsers: [],
        pets: [
            {id: 1, name: 'Pipo', race: 'Creole', age: 1, status: false}
        ],
        nameDog: '',
        raceDog: '',
        fileDog: '',

        userinput: '',
        passinput: '',
        pos: '',//change it to '' when the app.js is ready
    },
    methods: {
        login(){
            if (this.userinput.length > 0 && this.passinput.length > 0) {
                const index = this.users.findIndex((object) => {
                    return object.email == this.userinput;
                });
    
                if(index != -1 && this.passinput === this.users[index].pass){
                    this.pos = index;
                    this.newArrUsers[index].token = true;
                    this.updateLocalStorage();
                    // alert('Valid user!');
                    this.mensaje("Inicio exitoso", "success");

                    setTimeout(function(){ location.href = "app.html" }, 2000);//redirects to app.html after 2 seconds has passed

                }else{
                    // alert('Invalid password or email');
                    this.mensaje("Correo o contraseña incorrecta", "error");
                }
            }else{
                // alert('An email and password must be provided');
                this.mensaje("Por favor ingrese un usuario y contraseña", "error");
            }
        },
        logout(){
            if (confirm("¿Esta seguro de que desea cerrar sesión?") === true){
                this.newArrUsers[this.pos].token = false;
                this.pos = '';
                this.updateLocalStorage();
                this.mensaje("Se ha cerrado la sesión correctamente", "success");
                setTimeout(function(){ location.href = "index.html" }, 2000);
            }
        },
        mensaje: function (msj, icono) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-center',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: icono,
                title: msj
              })
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
