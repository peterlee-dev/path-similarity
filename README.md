# path-similarity

## 주어진 알파벳을 얼마나 획순으로 잘 쓰는지 판단해주는 AI 개발

---

# Stack

## python

-   tensorflow

## javascript, nodejs

-   express
-   react

---

## 실행전 유의 사항

-   server/paths.js 파일에서 파이썬 경로를 설정 해 주어야 한다

## work flow

1. 서버 구동
    - cd server -> npm start
2. 클라이언트 개발 서버 구동
    - cd client -> npm start
3. http://localhost:3000 열어 확인
    - 3개의 섹터로 구분되어 있다
    - 맨 왼쪽은 데이터를 쌓는 부분
    - 가운데는 특정 알파벳 트레이닝
    - 마지막은 학습된 모델로 예측 해 보기
