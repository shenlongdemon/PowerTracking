import {BaseSdo} from 'core_app/repositories';

export interface UserLoginSdo extends BaseSdo {
  id: number; // 1
  token: string; // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjoiMDk3ODQ4MDIwNiIsImF1dGhfdGltZSI6IjIwMjEtMDEtMDEiLCJpZCI6IjEiLCJqdGkiOiJlMmExOTYzZC01NGQ1LTQ1NTgtYWMzMS00NzRjZTM5NDdiMzYiLCJleHAiOjE2MDk4NzA0NDAsImlzcyI6IkdpYW1zYXRkdWxpZXUuY29tIiwiYXVkIjoiR2lhbXNhdGR1bGlldS5jb20ifQ.JG57r9Z20Tdqamt-BCc6esg8UmCrV6qf2lBRZPDNk1w"
  isadmin: string; //  "admin"
  infoapp: string; // "{"facebook":"facebook/giamsatdulieu", "zalo":"GSDL","web":"giamsatdulieu.com"}"
  linklogo: string; // http://giamsatdulieu.com/INFO/ori.JPG
}
