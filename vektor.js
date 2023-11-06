class Vektor{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    plusz(that){
        return new Vektor(this.x+that.x, this.y+that.y);
    }

    minusz(that){
        return new Vektor(this.x-that.x, this.y-that.y);
    }

    ellentett(){
        return new Vektor(-this.x, -this.y);
    }

    balraforgat90(){
        return new Vektor(-this.y, this.x);
    }

    jobbraforgat90(){
        return new Vektor(this.y, -this.x);
    }


    szamszoroz(){
        
    }

    skalarszoroz(){
        
    }

    szamosztva(){
        
    }

    hossz(){

    }

    egysegvektor(){

    }

}


u = new Vektor(5, 4);
v = new Vektor(2, 1);

u.plusz(v)