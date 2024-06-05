import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isOpen: boolean = true;
  constructor(
    private router: Router) {

  }
  ngOnInit() {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  private checkScreenWidth() {
    const width = window.innerWidth;
    // this.isSidebarClosed = width <= 768;
    if (width <= 500)
      this.closeNav();
    else
      this.openNav();
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login")
  }

  openNav() {
    this.isOpen = !this.isOpen;
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeNav() {
    this.isOpen = !this.isOpen;
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
}
