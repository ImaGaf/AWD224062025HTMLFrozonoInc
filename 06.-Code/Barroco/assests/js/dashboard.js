document.addEventListener('DOMContentLoaded', () => {
    new Chart(document.getElementById('ventasChart'), {
        type: 'line',
        data: {
            labels: fechas,
            datasets: [{
                label: 'Ventas ($)',
                data: totales,
                backgroundColor: 'rgba(166, 195, 173, 0.2)',
                borderColor: '#A6C3AD',
                borderWidth: 2,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: '#D3A373'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(document.getElementById('categoriaChart'), {
        type: 'bar',
        data: {
            labels: categorias,
            datasets: [{
                label: 'Ventas por Categoría ($)',
                data: ventasCategoria,
                backgroundColor: '#CCD5AE',
                borderColor: '#B9CCAE',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(document.getElementById('estadoChart'), {
        type: 'pie',
        data: {
            labels: estados,
            datasets: [{
                label: 'Órdenes por Estado',
                data: conteoEstados,
                backgroundColor: ['#D3A373', '#FAEDCD', '#A6C3AD', '#E9EDC9']
            }]
        },
        options: {
            responsive: true
        }
    });
});
