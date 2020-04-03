# Lost pet app Backend

Simple application to register lost pets, implementing custom NGINX middleware.

## Getting Started

First set the required envionment vaiables usign the following script:

```
export DATABASE_PASS=VALUE
export POSTGRES_PASS=VALUE
```

Now run the docker compose command:

```
docker-compose up --build
```

The app will be available on port [5000](http://localhost:5000/). You can make an HTTP POST request under the /lostPets path using the following JSON example to register a lost pet:

```
{
	"description":"A tiny pet",
	"photo":"",
	"latitude":5.545825,
	"longitude":-73.358748
}
```

Please send your image in base 64 encoded.

You can also enter under the /lostPets and /lastRecords routes through an HTTP GET request, to get all the records and the last 10 records specifically.

In addition to this, Prometheus will be available at port [9090](http://localhost:9090) and Grafana at port [3000](http://localhost:3000/).

## Built With

* [Node.js 12.16.1 LTS](https://nodejs.org/) - Runtime environment
* See also the used packages in each folder checking the package.json

## Authors

* **Alejandro González Rodríguez** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
