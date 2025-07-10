//https://graphicmaths.com/computer-science/graph-theory/dijkstras-algorithm/

var startingpoint;
var destination;
var nextstep;
var programstop;

function start(){
    nextstep = true
    programstop =false
    vertice_num=0       
    startingpoint=document.getElementById("start").value
    destination=document.getElementById("ende").value
    document.getElementById("route").innerHTML = ""
    dijkstra()
}

const graph={
    "1":{"18":12,"2":18,"3":33,"6":24,"15":20,"16":12,"17":8,"21":11},
    "2":{"1":18},
    "4":{"3":21, "5":4},
    "19":{"20":28,"18":24},
    "20":{"19":28, "15":23},
    "17":{"16":7,"1":8},
    "16":{"17":7,"15":7,"1":12},
    "14":{"13":12},
    "13":{"14":12,  "15":16,"12":23,"22":11},
    "8":{"7":19, "9":9},
    "11":{"12":10},
    "10":{"9":8},
    "7":{"6":3,"8":19},
    "5":{"6":29,"4":4},
    "3":{"1":33,"4":21},
    "18":{"1":12,"19":24},
    "6":{"1":24,"7":3,"5":29,"22":22,"21":20},
    "15":{"20":23,"13":16,"16":7,"1":20,"22":4},
    "12":{"13":23,"11":10, "9":18},
    "9":{"10":8,"12":18,"8":9},
    "24":{"22":11},
    "22":{"15":4,"24":11,"13":11,"6":22},
    "23":{"21":10},
    "21":{"23":10,"1":11,"6":20}

} 


function dijkstra(){
    //setup
    globalThis.vis={
        "1":0,
        "2":0,
        "4":0,
        "19":0,
        "20":0,
        "17":0,
        "16":0,
        "14":0,
        "13":0,
        "8":0,
        "11":0,
        "10":0,
        "7":0,
        "5":0,
        "3":0,
        "18":0,
        "6":0,
        "15":0,
        "12":0,
        "9":0,
        "24":0,
        "22":0,
        "23":0,
        "21":0
    }
    
    globalThis.dist={
        "1":Infinity,
        "2":Infinity,
        "4":Infinity,
        "19":Infinity,
        "20":Infinity,
        "17":Infinity,
        "16":Infinity,
        "14":Infinity,
        "13":Infinity,
        "8":Infinity,
        "11":Infinity,
        "10":Infinity,
        "7":Infinity,
        "5":Infinity,
        "3":Infinity,
        "18":Infinity,
        "6":Infinity,
        "15":Infinity,
        "12":Infinity,
        "9":Infinity,
        "24":Infinity,
        "22":Infinity,
        "23":Infinity,
        "21":Infinity
    }
    
    globalThis.prev={
        "1":null,
        "2":null,
        "4":null,
        "19":null,
        "20":null,
        "17":null,
        "16":null,
        "14":null,
        "13":null,
        "8":null,
        "11":null,
        "10":null,
        "7":null,
        "5":null,
        "3":null,
        "18":null,
        "6":null,
        "15":null,
        "12":null,
        "9":null,
        "24":null,
        "22":null,
        "23":null,
        "21":null
    }
    //step1
    dist[startingpoint] = 0
    //neighbors1 sind alle nachbarn
    const neighbors1 =Object.keys(graph[startingpoint])

    //startpunkt als besucht markieren und vorgaenger eintragen
    vis[startingpoint] = 1
    for(idx in neighbors1){
        prev[neighbors1[idx]] = startingpoint
    }

    //step2-4
    var sum_visited=0
    //solange noch nicht alle besucht wurden wdh
    while(sum_visited<Object.keys(vis).length){
        var smallest_dist = Infinity
        for(idx in dist){
            //als nächstes wird unbesuchter knoten mit kleinster distanz angeschaut
            if(dist[idx]<smallest_dist && vis[idx]==0){
                smallest_dist = dist[idx]
                //neuer startpunkt
                startingpoint=idx
            }
        }

        //alle unbesuchten nachbarn finden
        const neighbors2 =[]
        for (key in graph[startingpoint]) {
            if(key!=startingpoint && vis[key]==0){
                neighbors2.push(key)
            }
        }
        //distanz update falls kleinere distanz gefunden
        for(idx in neighbors2){
            newdist = dist[startingpoint] + graph[startingpoint][neighbors2[idx]]
            if(newdist<dist[neighbors2[idx]]){
                dist[neighbors2[idx]] = newdist
                prev[neighbors2[idx]] = startingpoint
            }
        }
        vis[startingpoint]=1
        neighbors2.length=0
        
        count= 0
        for(key in vis){
            count =count+vis[key]
        }
        sum_visited=count
    }
    find_path()
}

//step5 (rueckwaerts weg finden)
function find_path(){
    globalThis.path=[]
    var current=destination
    while(current!==null){
        path.push(current)
        current=prev[current]
    }
    path.reverse()
    console.log(path)
    preloadImages() 

    
}

function preloadImages(){
    for(let node=0; node<path.length;node++){
        if(node===(path.length)-1){
            img="img/"+String(path[node])+".jpg"
            var link = document.createElement("link")
            link.href = img
            link.rel="preload"
            link.as="image"
            document.head.appendChild(link)
            show_path()
        }
        else{
            img="img/"+String(path[node])+"zu"+String(path[node+1])+".jpg"
            var link = document.createElement("link")
            link.href = img
            link.rel="preload"
            link.as="image"
            document.head.appendChild(link)
        }
        
    }
    console.log(document.head)
    
        
}


function weiter(){
    nextstep = true
    if(programstop===false){
    show_path()
    }
}

var vertice_num = 0
function show_path(){
    while(nextstep===true){
        if(vertice_num===(path.length)-1){
            node=path[vertice_num]
            img = "<img src=img/"+String(node)+".jpg style='width:150px; height:150px;'></img>"
            document.getElementById("route").innerHTML +=img
            document.getElementById("route").innerHTML += "<br>"

            description = "Du bist bei deinem Ziel " + String(node)+" angelangt"
            document.getElementById("route").innerHTML += description
            document.getElementById("route").innerHTML += "<br>"
            
            
            nextstep=false
            programstop = true
        } 
    
        else{
            node=path[vertice_num]
            next=path[vertice_num+1]
            img = "<img src=img/"+String(node)+"zu"+String(next)+".jpg style='width:150px; height:150px;'></img>"

            document.getElementById("route").innerHTML +=img
            document.getElementById("route").innerHTML += "<br>"

            description = "Gehe in Richtung von " + String(next)
            document.getElementById("route").innerHTML += description
            document.getElementById("route").innerHTML += "<br>"
            nextstep=false
            vertice_num++
        }
    }
}


