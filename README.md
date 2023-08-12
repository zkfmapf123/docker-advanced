# Docker-Advanced Function

## 1. Logs

```
    docker logs tail -1 <container-name>

    docker run --name <container-name> --log-opt max-size=5k --log-opt max-file=3 <docker-iamges>

    docker run --name todo-server --log-opt max-size=5k --log-opt max-file=3 --network ff660b6a7a40 -p 3000:3000 -e PORT=3000  server_node-todo

    ## --log-opt max-size=5k 단일 로그 파일의 최대크기를 5kb
    ## --log-opt max-file=3 파일을 3개로 유지

    docker-compose up --build
```

## 2. Log Forwarding use Fluentd

![fluentd](./public/fluentd.png)

```
    docker-compose -f docker-compose.archiving.yaml up --build

    // apiserver는 다시 Restart 해야 함
    // locahost:5601 -> Analytics -> Discorver
```

## Conclusion

### ELK (logstash vs Fluentd)

- 보통의 경우라면 ELK의 로그수집기는 Logstash 다.
- 하지만 Container 환경이라면 must는 아니다

> Logstash의 특징

- 호스트에 JRuby (자바 런타임) 가 필요함
- 메모리상의 큐에 고정된 크기의 20개의 이벤트를 가지고있음 지속성을 위하여 Redis나 Kafka 같은 외부 큐에 의존
-

> Fluentd 특징

- 이벤트에 태그를 지정하고 각 이벤트 유형으로 더 쉽게 라우팅이 가능하다.

```
    output { if [loglevel] == "ERROR" and [development] == "production" { { ... } }
```

- flugin이 logstash 보다 너 많음
- 내부 버퍼링시스템이 존재
- \*\*\* Docker 자체에 fluentd용 로깅 드라이버가 존재 (stdout)

## Reference

- <a href="https://docs.fluentd.org/container-deployment/docker-compose"> Fluentd Document </a>
