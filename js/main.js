//LOGIC

var app = new Vue({
    el: '#app',
    data: {
        users: [
            {id: 1, name: 'test1', lastname: 'lastname1', email: 'test1@example.com', pass: '1234', token: false, status: 'user'},
            {id: 1, name: 'admin1', lastname: 'adm', email: 'admin@example.com', pass: '1234', token: false, status: 'admin'},
        ],
        newArrUsers: [],
        pets: [
            {id: 1, img: '../images/pets/p1.jpg', name: 'Cheems', race: 'Akita', age: 4, status: true, type: 'Perro', adoptedby: ''},
            {id: 2, img: '../images/pets/p2.jpg', name: 'Rex', race: 'Corgi', age: 2, status: true, type: 'Perro', adoptedby: ''},
            {id: 3, img: '../images/pets/p3.jpg', name: 'Qwerty', race: 'Golden R.', age: 3, status: true, type: 'Perro', adoptedby: ''},
            {id: 4, img: '../images/pets/p4.jpg', name: 'Cerberus', race: 'Pomerania', age: 1, status: true, type: 'Perro', adoptedby: ''},
            {id: 5, img: '../images/pets/c1.jpg', name: 'Pelusa', race: 'Criollo', age: 1, status: true, type: 'Gato', adoptedby: ''},
            {id: 6, img: '../images/pets/c2.jpeg', name: 'Tom', race: 'Criollo', age: 1, status: true, type: 'Gato', adoptedby: ''},
            {id: 7, img: '../images/pets/c3.jpg', name: 'Meme', race: 'Criollo', age: 2, status: true, type: 'Gato', adoptedby: ''},
            {id: 8, img: '../images/pets/c4.jpg', name: 'Natasha', race: 'Siames', age: 1, status: true, type: 'Gato', adoptedby: ''},
        ],
        newArrPets: [],
        adminData: [],
        nameDog: '',
        raceDog: '',
        fileDog: '',
        nPetsAdopted: 0,
        userinput: '',
        passinput: '',
        pos: '',//change it to '' when the app.js is ready
        foption: 'all',
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

                    setTimeout(function(){ location.href = "app.html" }, 1500);//redirects to app.html after 2 seconds has passed

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
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })       
            swalWithBootstrapButtons.fire({
                title: '¿Esta seguro de que desea cerrar sesión?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, Cerrar sesión',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    this.newArrUsers[this.pos].token = false;
                    this.pos = '';
                    this.updateLocalStorage();
                    this.mensaje("Se ha cerrado la sesión correctamente", "success");
                    setTimeout(function(){ location.href = "index.html" }, 1500);
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                }
            })
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
        delData(index){
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })       
            swalWithBootstrapButtons.fire({
                title: '¿Estás seguro?',
                text: "No podras revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, Eliminar',
                cancelButtonText: 'No, Cancelar',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    this.adminData.splice(index, 1);
                    this.mensaje("Eliminado", "success");
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                }
            })
        },
        listData(){
            this.newArrUsers = this.users;
        },
        updateLocalStorage(){
            localStorage.setItem('users', JSON.stringify(this.newArrUsers));
            localStorage.setItem('petsn', JSON.stringify(this.newArrPets));
            localStorage.setItem('pets', JSON.stringify(this.pets));
            localStorage.setItem('pos', JSON.stringify(this.pos));
            localStorage.setItem('nadopt', JSON.stringify(this.nPetsAdopted));
            localStorage.setItem('admdata', JSON.stringify(this.adminData));
        },
        filter(){
            if (this.foption === 'all') {
                this.newArrPets = this.pets.filter(e => e.status === true);
                this.updateLocalStorage();
            }else{
                this.newArrPets = this.pets.filter(e => e.type === this.foption && e.status === true);
                this.updateLocalStorage();
            }
        },
        adopt(item){
            item.status = false;
            const index = this.pets.findIndex((object) => {
                return object.name == item.name;
            });
            this.pets[index].status = false;
            item.adoptedby = `${this.newArrUsers[this.pos].name} ${this.newArrUsers[this.pos].lastname}`;
            this.newArrPets = this.pets.filter(e => e.status === true);
            this.nPetsAdopted += 1;
            this.foption = 'all';
            const date = new Date();
            this.adminData.push({
                name: item.name,
                date: date.toLocaleDateString(),
                adopter: item.adoptedby
            });
            this.updateLocalStorage();
        }
    },
    created(){
        if (localStorage.getItem('users') !== null) {
            this.newArrUsers = JSON.parse(localStorage.getItem('users'));
            this.pos = JSON.parse(localStorage.getItem('pos'));
            this.nPetsAdopted = JSON.parse(localStorage.getItem('nadopt'));
        }else{
            this.listData();
            this.pos = this.pos;
            this.nPetsAdopted = this.nPetsAdopted;
        }

        if (localStorage.getItem('petsn') !== null && localStorage.getItem('pets') !== null) {
            this.newArrPets = JSON.parse(localStorage.getItem('petsn'));
            this.pets = JSON.parse(localStorage.getItem('pets'));
        }else{
            this.newArrPets = this.pets;
            this.pets = this.pets;
        }

        if (localStorage.getItem('admdata') !== null) {
            this.adminData = JSON.parse(localStorage.getItem('admdata'));
        }else{
            this.adminData = this.adminData;
        }
    }
});
