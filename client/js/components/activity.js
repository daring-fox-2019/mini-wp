Vue.component('activity',{
    props: ['list'],
    data(){
        return {
            list2: '',
            month: '',
            day: ''
        }
    },
    template: `
    <div class="container">
    <div class="col-lg-4-sm-6">
    </div>
    <div class="chart-container col" style="margin-top:7%;height:40vh; width:60vw;">
    <h2>My Writing Activity in {{ new Date().getFullYear() }}</h2>
    <canvas id="myChart">
    </canvas>
    </div>
    </div>
    `,
    watch: {
        list (){
            let jan = 0
            let feb = 0
            let mar = 0
            let apr = 0
            let may = 0
            let jun = 0
            let jul = 0
            let aug = 0
            let sep = 0
            let oct = 0
            let nov = 0
            let dec = 0
            console.log(jan)
            this.list2 = this.list.map((el) => el.createdAt)
            this.month = this.list2.map((el) => {
                if(new Date(el).getFullYear() == new Date().getFullYear()){
                    return new Date(el).getMonth()
                }
            })
            for (let i = 0; i < this.month.length; i++){
                switch (this.month[i]){
                    case 0 :
                    jan++
                    break
                    case 1 :
                    feb++
                    break
                    case 2 :
                    mar++
                    break
                    case 3 :
                    apr++
                    break
                    case 4 :
                    may++
                    break
                    case 5 :
                    jun++
                    break
                    case 6 :
                    jul++
                    break
                    case 7 :
                    aug++
                    break
                    case 8 :
                    sep++
                    break
                    case 9 :
                    oct++
                    break
                    case 10 :
                    nov++
                    break
                    case 11 :
                    dec++
                    break
                }
            }
            
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [{
                        label: 'monthly writing activity in '+new Date().getFullYear(),
                        backgroundColor: 'rgba(0, 0, 255, 0.5)',
                        borderColor: 'rgb(25, 25, 255)',
                        data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
                    }]
                },        
                options : {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                userCallback: function(label, index, labels) {
                                    // when the floored value is the same as the value we have a whole number
                                    if (Math.floor(label) === label) {
                                        return label;
                                    }
               
                                },
                            }
                        }],
                    },
                }
            });
        }
    },
    mounted() {
    },
})