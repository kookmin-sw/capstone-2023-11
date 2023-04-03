---
layout: page
title: test
include_in_header: false
main: true
---

## 프로젝트 소개
#### 개발 동기
핵가족이 주류의 가족구성원이 된 현대사회에서, 멀리떨어진 부모님의 건강상태를 살피는 일은 쉽지
않습니다. 전화로 안부를 묻는 것에서 벗어나, 부모님의 식습관과 운동량 및 복용중인 약과 같은 건강 정보에 대한
피드백을 공유받고, 이에 대한 적절한 조언을 제공받음으로써 부모님의 건강을 쉽고 체계적으로 
관리할 수 있다면 고령화 사회에 생기는 건강문제에 기여할 수 있지 않을까 생각했습니다. 과거와
달리 어르신들(부모님)에게도 스마트폰의 보급률이 높아지고 스마트폰의 사용이 익숙해진 만큼, 
부모님과 보호자 사이에서의 생기는 정보격차를 손쉬운 정보 공유(우리가 만든 서비스)로 해결하고자 합니다😃.
   
#### 해결하고자 하는 문제
1. 부모님과 멀리 떨어져 살기 때문에 건강상태를 수시로 체크하기 어렵다.
2. 부모님에게 건강상태를 물으시면, 대부분 괜찮다고 하시는분들이 많은데 자세하게 알고싶으나 계속 물어보기 힘들다
3. 자신의 병을 알고 있다고 해도 생활에 적용하기 힘들다.
4. 내가 얼마나 건강한(하지 않은) 삶을 살고 있는지에 대해서 잘 모른다.
5. 약을 많이 챙겨 먹고 있는데, 관리하기 쉽지 않고, 같이 복용한다면 부작용이 있는 약이 있을 수 있다.
6. 건강 관리 앱은 많지만 노년층에게 친화적인 앱은 많지 않다.

#### 기대효과
1. 간단하게 요약되는 부모님의 건강상태를, 부모님뿐만 아니라 보호자들도 어플을 통해서 
   손쉽게 제공받을 수 있어, 건강상태 파악에 용이하도록 한다.
2. 부모님이 막연히 괜찮다고 하시는 대답에 대한 해결책을 건강 주간 보고서를 통해 제시한다.
3. 자신이 얼마나 건강한 삶을 살고 있는지에 대한 피드백을 받음으로써 생활습관을 개선 혹은 유지할 수 있도록 한다.
4. 무엇보다, 손쉬운 사용과 높은 가독성을 제공함으로써 진입장벽을 낮추어, 누구나 쉽게 사용 할 수 있도록 한다.

## Abstract
We aim to provide a health information sharing service to check and manage the health status of parents who live far away. The goal is to increase communication between parents and children regarding health issues, and enable children to constantly monitor their parents' health status. When analyzing eating habits by adding users' diseases, weights will be placed to manage them. We will provide an app with a low entry barrier that anyone can easily use, making it easy for both parents and caregivers to understand their health status.


## 소개 영상


## 기술 스택

### 🖥 Frontend

|역할|종류|
|-|-|
|Library|<img alt="RED" src ="https://img.shields.io/badge/REACT-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white"/>  <img alt="RED" src ="https://img.shields.io/badge/REACT NATIVE-3655FF.svg?&style=for-the-badge&logo=React&logoColor=white"/>|
|Styling|![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)|
|State Management|![Recoil](https://img.shields.io/badge/Recoil-007af4.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1NS4yMSA2MjMuOTEiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDp3aGl0ZX08L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im03NC42MiAyNzcuNDYgMS4yNC0uMTMgMzQuNzgtMy4yOC01My40Ny01OC42NkE5Ni40NyA5Ni40NyAwIDAgMSAzMiAxNTAuM0gzYTEyNS4zIDEyNS4zIDAgMCAwIDMyLjggODQuNTdaTTE3Ny4xMyAzNDdsLTM2IDMuNCA1My4zMiA1OC41MUE5Ni40MSA5Ni40MSAwIDAgMSAyMTkuNjMgNDc0aDI4LjkyYTEyNS4yOCAxMjUuMjggMCAwIDAtMzIuNzYtODQuNTdaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjUzLjY5IDIzMS42OGMtNi4zMy0zMS4zLTMwLjg5LTU0LjA5LTYyLjU3LTU4LjA3bC02LjM1LS43OWE0OS42MSA0OS42MSAwIDAgMS00My4zNS00OS4xM3YtMjBhNTIuNzUgNTIuNzUgMCAxIDAtMjguOTEtLjM2djIwLjM4YTc4LjU2IDc4LjU2IDAgMCAwIDY4LjY1IDc3LjgybDYuMzYuOGMyMy4yNCAyLjkyIDM0Ljc4IDIwIDM3LjgzIDM1LjFzLS45MyAzNS4zMi0yMS4yMiA0N2E3My44MSA3My44MSAwIDAgMS0zMC4wNiA5LjYybC05NS42NiA5YTEwMi40NSAxMDIuNDUgMCAwIDAtNDEuOCAxMy4zOEM5IDMzMi40NS00LjgxIDM2MyAxLjUyIDM5NC4yOXMzMC44OSA1NC4wOCA2Mi41NyA1OC4wNmw2LjM1LjhhNDkuNiA0OS42IDAgMCAxIDQzLjM1IDQ5LjEydjE4YTUyLjc1IDUyLjc1IDAgMSAwIDI4LjkxLjI2di0xOC4yNmE3OC41NSA3OC41NSAwIDAgMC02OC42NS03Ny44MWwtNi4zNi0uOGMtMjMuMjQtMi45Mi0zNC43OC0yMC4wNS0zNy44My0zNS4xMXMuOTMtMzUuMzIgMjEuMjItNDdhNzMuNjggNzMuNjggMCAwIDEgMzAuMDYtOS42M2w5NS42Ni05YTEwMi40NSAxMDIuNDUgMCAwIDAgNDEuOC0xMy4zOGMyNy42NS0xNi4wMiA0MS40LTQ2LjU0IDM1LjA5LTc3Ljg2WiIvPjwvc3ZnPg==&logoColor=white)|
|Programming Language|![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)|
|Data Fetching|![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)|
|Formatting|![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)|
|Package Manager|![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)|                                         
|Version Control|![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) |
|CI/CD|![Vercel](https://img.shields.io/badge/vercel-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)|

### 🖥 Backend

|역할|종류|
|-|-|
|Framework|<img alt="RED" src ="https://img.shields.io/badge/SPRING-6DB33F.svg?&style=for-the-badge&logo=Spring&logoColor=white"/> <img alt="RED" src ="https://img.shields.io/badge/SPRING Boot-6DB33F.svg?&style=for-the-badge&logo=SpringBoot&logoColor=white"/>|
|Database|<img alt="RED" src ="https://img.shields.io/badge/MariaDB-003545.svg?&style=for-the-badge&logo=MariaDb&logoColor=white"/>|
|Database Service|<img alt="RED" src ="https://img.shields.io/badge/Amazon Rds-527FFF.svg?&style=for-the-badge&logo=AmazonRds&logoColor=white"/> <img alt="RED" src ="https://img.shields.io/badge/Amazon S3-569A31.svg?&style=for-the-badge&logo=AmazonS3&logoColor=white"/>|
|Programming Language|<img alt="RED" src ="https://img.shields.io/badge/JAVA-004027.svg?&style=for-the-badge&logo=Jameson&logoColor=white"/>|
|API|![REST](https://img.shields.io/badge/Rest-4B3263?style=for-the-badge&logo=rest&logoColor=white)                                     
|Version Control|![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) |
|CI/CD|![Jenkins](https://img.shields.io/badge/Jenkins-%D24939.svg?style=for-the-badge&logo=Jenkins&logoColor=white)|

## 팀원 소개
<div>
<div margin = "0 auto">
    <table margin = "0 auto">
        <tr align="center">
            <td style="min-width: 150px;">
                <a href="https://github.com/jea0716">
                <img src="https://github.com/jea0716.png" width="100">
                <br />
                <b>박동재 (jea0716)</b>
                </a> 
                <br/>
                ****1609
            </td>
            <td style="min-width: 150px;">
                <a href="https://github.com/hayounSong">
                <img src="https://github.com/hayounSong.png" width="100">
                <br />
                <b>송하윤 (hayounSong)</b>
                </a>
                        <br/>
                ****1633
            </td>
            <td style="min-width: 150px;">
                <a href="https://github.com/jjun990908">
                <img src="https://github.com/jjun990908.png" width="100">
                <br />
                <b>박준영 (
    jjun990908)</b>
                </a> 
                        <br/>
                ****1620
            </td>
            <td style="min-width: 150px;">
                <a href="https://github.com/ho-jun99">
                <img src="https://github.com/ho-jun99.png" width="100">
                <br />
                <b>김호준 (ho-jun99)</b>
                </a> 
                        <br/>
                ****1605
            </td>
                    <td style="min-width: 150px;">
                <a href="https://github.com/CULRRY">
                <img src="https://github.com/CULRRY.png" width="100">
                <br />
                <b>김호준 (CULRRY)</b>
                </a> 
                        <br/>
                ****1604
            </td>
        </tr>
        <tr align="center">
            <td>
                Frontend
            </td>
            <td>
                Frontend
            </td>
            <td>
                Frontend
            </td>
                    <td>
                Backend
            </td>
                    <td>
                Backend
            </td>
        </tr>
    </table>
 




<br />

</div>
</div>
