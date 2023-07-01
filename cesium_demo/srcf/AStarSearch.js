

class AstarAlgorithm {
    constructor(grid) {
      this.grid = grid;
      this.rows = grid.length;
      this.cols = grid[0].length;
      console.log("rows:" + this.rows + " cols: " + this.cols);
      this.startNode = new Node(0, 0, 0, 0, 0, 0);
      this.endNode = new Node(this.rows - 1, this.cols - 1, 0, 0, 0, 0);
    }
    findPath() {
      // console.log("test path:"); 
      
      let signgrid = new Array(this.rows);     //这个矩阵是标志矩阵，用于存储每一个节点在openList/coledList中的状态
                                               //值为0代表在openList中，值为1代表在closedList中，值为-1代表即不在openList/coledList中中
      for (var i = 0; i < this.rows; i++) {
        signgrid[i] = new Array(this.cols);
      }
      for (var i = 0; i < this.rows; i++)      //首先初始化为-1
      {
        for (var j = 0; j < this.cols; j++)
        {
          signgrid[i][j] = -1;
        }
      }

      let openList = [this.startNode];
      let closedList = [];
      signgrid[this.startNode.getX()][this.startNode.getY()] = 0;
      // console.log(signgrid);

      // function getLowestFNode(nodeList) {
      //   var lowestFNode = nodeList[0];
      //   // console.log("这里测是否进入Fnode");
      //   for (var i = 1; i < nodeList.length; i++) {
      //     if (nodeList[i].getF() < lowestFNode.getF()) {
      //       lowestFNode = nodeList[i];
      //     }
      //     //console.log("这里测是否进入for循环");        //没有进入这个循环好像.
      //   }
      //   return lowestFNode;
      // }

      function getLowestFNode(nodeList) {
        var lowestFNode = nodeList[0];
        return lowestFNode;
      }
  
      function getDistance(node1, node2) {
        return Math.sqrt((node1.getX() - node2.getX()) ** 2 + (node1.getY() - node2.getY()) ** 2);
      }
  
      function getGradient(node1, node2, grid) {             //这里设置斜率的阈值（形参grid）
          var Gradient = (grid[node2.getX()][node2.getY()] - grid[node1.getX()][node1.getY()]) /
          (22.2 * ((node1.getX() - node2.getX()) ** 2 + (node1.getY() - node2.getY()) ** 2) ** 0.5);
         // console.log("Gradient:",Gradient);
          return Gradient;
      }


      function MYContain(nodeList, node) {
        for (var j = 0; j < nodeList.length; ++j)
          {
            if((nodeList[j].getX() === node.getX()) && (nodeList[j].getY()=== node.getY())){
            return true;
            }
          }
          return false;
      }

      function InsertOrderedArray(nodeList, node) {
        var BuffOrderArray = nodeList;
        var Upcount = BuffOrderArray.length;
        var Belowcount = 0;
        var MidCount = Math.floor((Upcount + Belowcount) / 2);
        if (BuffOrderArray.length == 0)
        {
          BuffOrderArray.push(node);
        }
        else
        {
          if (node.getF() >= BuffOrderArray[BuffOrderArray.length - 1].getF())
          {
            BuffOrderArray.push(node);
          }
          else if (node.getF() <= BuffOrderArray[0].getF())
          {
            BuffOrderArray.splice(0, 0, node);
          }
          else
          {
            while (!((node.getF() >= BuffOrderArray[MidCount].getF()) && (node.getF() < BuffOrderArray[MidCount + 1].getF())))
            {
              if (node.getF() >= BuffOrderArray[MidCount].getF())
              {
                Belowcount = MidCount;
              }
              else
              {
                Upcount = MidCount;
              }
              MidCount = Math.floor((Upcount + Belowcount) / 2);
            }
          BuffOrderArray.splice(MidCount + 1, 0, node);
          }
          
        }
        return BuffOrderArray;
      }

  
      function getNeighbors(node, rows, cols) {               //（形参rows，cols）
        let neighbors = [];
        let x = node.getX();
        let y = node.getY();
        if (x + 1 <= rows - 1) {
          neighbors.push(new Node(x + 1, y, 0, 0, 0));
        }
        if (x - 1 >= 0 && x - 1 <= rows - 1) {
          neighbors.push(new Node(x - 1, y, 0, 0, 0));
        }
        if (y - 1 >= 0 && y - 1 <= cols - 1) {
          neighbors.push(new Node(x, y - 1, 0, 0, 0));
        }
        if (y + 1 <= cols - 1) {
          neighbors.push(new Node(x, y + 1, 0, 0, 0));
        }
        if (x + 1 <= rows - 1 && y + 1 <= cols - 1) {
          neighbors.push(new Node(x + 1, y + 1, 0, 0, 0));
        }
        if ((x - 1 >= 0 && x - 1 < rows - 1) && (y - 1 >= 0 && y - 1 < cols - 1)) {
          neighbors.push(new Node(x - 1, y - 1, 0, 0, 0));
        }
        if ((x + 1 <= rows - 1) && (y - 1 >= 0 && y - 1 < cols - 1)) {
          neighbors.push(new Node(x + 1, y - 1, 0, 0, 0));
        }
        if ((x - 1 >= 0 && x - 1 < rows - 1) && (y + 1 <= cols - 1)) {
          neighbors.push(new Node(x - 1, y + 1, 0, 0, 0));
        }
        return neighbors;
      }
  
      function getPath(node) {
        let path = [node];
        while (node.getParent() != null) {
          node = node.getParent();
          path.push(node);
        }
        return path.reverse();
      }
      let EndNeighbors = getNeighbors(this.endNode, this.rows, this.cols);
      window.current = getLowestFNode(openList);
      let flat = 0;


      while (openList.length>0) {
        if (MYContain(EndNeighbors, current)) {    //这里判断当前节点的邻节点是否包含终点，如果包含终点，
                                                   //则不用进行最小F判断，直接把终点作为下一个节点，并对终点进行，而当前节点设置为终点节点的父节点
          this.endNode.setParent(current);
          current = this.endNode;
        }
        else {
          current = getLowestFNode(openList);
          // console.log("test");
          // openList = openList.filter((el) => !Object.is(el, current));
          //openList = openList.filter((node) => node != current);
        }

        openList.splice(0,1);            //这里从openList中剔除current，current在openList的第一个位置
        // console.log("openlist length", openList.length);
        // console.log("open:",openList.length);
        // console.log("close:",closedList.length);
        // console.log(closedList);

        if (signgrid[current.getX()][current.getY()] !== 1) {          //判断current是否在closedList中可更改搜索方式，以提高判断效率
          closedList.push(current);
          signgrid[current.getX()][current.getY()] = 1;
        }
        // console.log("closedlist length", closedList.length);
        //console.log("current:",current.getX(), current.getY());

        if ((current.getX() === this.endNode.getX()) && (current.getY() === this.endNode.getY())) {
          console.log("found !!!");
          return getPath(current);
        }
        //console.log("fasdfasdf");
  
        let neighbors = getNeighbors(current, this.rows, this.cols);
       // console.log("neighoors:",neighbors.length);


       ////////////////////////////////////////////////////分界线/////////////////////////////////////////////////
       //注意：下面的实现具有很大的局限性，完备性函数g不能有效其作用。

       
        //于的实现
        // for (let i = openList.length - 1; i >= 0; i--) {
        //   openList.splice(i, 1);
        // }
        
        // //console.log("qingchu:",openList.length);
        // for (let neighbor of neighbors) {
        //   // if (closedList.includes(neighbor)) {
        //   //   continue;
        //   // }
        //   if(MYContain(closedList, neighbor)){
        //     continue;
        //   }
          
        //   let gScore = current.getG() + getDistance(current, neighbor);
        //   if (!MYContain(openList, neighbor)){
        //     openList.push(neighbor);
        //   }
        //   neighbor.setParent(current);
        //   neighbor.setG(gScore);
        //   neighbor.setH(getDistance(neighbor, this.endNode));
        //   let Nneighbors = getNeighbors(neighbor, this.rows, this.cols);     //找到cruuent的每一个邻节点的邻节点
        //   let NneighborGradient = [];                                        //用于储存neighbor八个方向的斜率
        //   for (let i = 0 ; i < Nneighbors.length ; i++) {                    //计算neighbor八个方向的斜率，并存在NneighborGradient中
        //     NneighborGradient[i] = getGradient(neighbor, Nneighbors[i], this.grid)   
        //   }
        //   let MaxNneighborGradient = Math.max(...NneighborGradient);          //计算NneighborGradient数组中的最大值作为这个neighbor的斜率
          
        //   // neighbor.setF(neighbor.getG() + (int)1.4*neighbor.getH() + (int)Math.abs(50 * getGradient(current,neighbor)));
        //   let L = Math.abs(this.endNode.getX() - this.startNode.getX()) + Math.abs(this.endNode.getY() - this.startNode.getY());
        //   let deepl = Math.abs(current.getX() - this.startNode.getX()) + Math.abs(current.getY() - this.startNode.getY());
        //   let q2 = 0.5 + 0.4 * (1 - deepl / L);
        //   let Slope_Limit = 0.2;                       //爬坡阈值设置
        //   // let Slope_Factor = (Math.log2(((this.cols ** 2 + this.rows ** 2) ** 0.5) )) / Slope_Limit;    //和爬坡阈值相关
        //   let Slope_Factor = (Math.log2(2.7)) / Slope_Limit;    //和爬坡阈值相关
        //   // console.log("Slope_Factor " + Slope_Factor);
        //   let neighborsk = Math.pow(2, Math.abs( Slope_Factor * MaxNneighborGradient));
        //   // if (neighborsk > ((this.cols ** 2 + this.rows ** 2) ** 0.5) * 2)
        //   // {
        //   //   neighborsk = ((this.cols ** 2 + this.rows ** 2) ** 0.5) * 2;
        //   // }
        //   neighbor.setK(neighborsk);
        //   console.log("MaxNneighborGradient" + MaxNneighborGradient);
        //   console.log("Display k " + neighbor.getK());
        //   neighbor.setF((1 - q2) * neighbor.getG() + q2 * neighbor.getH() + neighbor.getK());
        //   //后面除以缩小因子，防止数据过大，可设计自适应因子（这里暂时设置为固定值1000）
        //   // neighbor.setF( neighbor.getG() + neighbor.getH() + Math.pow(2, Math.abs(2.5*Slope_Factor * getGradient(current, neighbor,this.grid))/6));
        //   //neighbor.setF((1 - q2) * neighbor.getG() + q2 * neighbor.getH());
        // }


        /////////////////////////////////////////////////分界线///////////////////////////////////////////////////
  

        for (let neighbor of neighbors) {
          
          if (signgrid[neighbor.getX()][neighbor.getY()] == 1) {
            continue;
          }

          // if (signgrid[neighbor.getX(),neighbor.getY()] = 1) {          //判断current是否在closedList中可更改搜索方式，以提高判断效率
          //   continue;
          // }


          if(neighbor.getParent() == null)
          {
            
            let gScore = current.getG() + getDistance(current, neighbor);
            neighbor.setParent(current);
            neighbor.setG(gScore);
            if (Math.abs(neighbor.getX() - this.endNode.getX()) > Math.abs(neighbor.getY() - this.endNode.getY()))
            {
              neighbor.setH(getDistance(neighbor, this.endNode)) + 0.5 * Math.abs(neighbor.getY() - this.endNode.getY());
            }
            else
            {
              neighbor.setH(getDistance(neighbor, this.endNode)) + 0.5 * Math.abs(neighbor.getX() - this.endNode.getX());
            }
            
            let Nneighbors = getNeighbors(neighbor, this.rows, this.cols);     //找到cruuent的每一个邻节点的邻节点
            let NneighborGradient = [];                                        //用于储存neighbor八个方向的斜率
            for (let i = 0 ; i < Nneighbors.length ; i++) {                    //计算neighbor八个方向的斜率，并存在NneighborGradient中
              NneighborGradient[i] = getGradient(neighbor, Nneighbors[i], this.grid)   
            }
            let MaxNneighborGradient = Math.max(...NneighborGradient);          //计算NneighborGradient数组中的最大值作为这个neighbor的斜率
            let L = Math.abs(this.endNode.getX() - this.startNode.getX()) + Math.abs(this.endNode.getY() - this.startNode.getY());
            let deepl = Math.abs(current.getX() - this.startNode.getX()) + Math.abs(current.getY() - this.startNode.getY());
            let q2 = 0.1 + 0.4 * (1 - deepl / L);
            let Slope_Limit = 0.3;                       //爬坡阈值设置
            let Slope_Factor = (Math.log2(((this.cols ** 2 + this.rows ** 2) ** 0.5) / 30 )) / Slope_Limit;    //和爬坡阈值相关
            // let Slope_Factor = (Math.log2(30)) / Slope_Limit;    //和爬坡阈值相关
            let neighborsk = Math.pow(2, Math.abs( Slope_Factor * MaxNneighborGradient));
            
            neighbor.setK(neighborsk);
            // neighbor.setK(2 ** Math.abs(40 * getGradient(current, neighbor, this.grid)));
            neighbor.setF((1 - q2) * neighbor.getG() + q2 * neighbor.getH() + neighbor.getK());   //DEM-based A* Algorithm
            // neighbor.setF((1 - q2) * neighbor.getG() +  2 * q2 * neighbor.getH());                   //A* Algorithm
            // neighbor.setF((1 - q2) * neighbor.getG());                                            //Dijkstra Algorithm
            // console.log("display F:" + neighbor.getF());
            if (!MYContain(openList, neighbor)) {        //这里判断neighbor是否在openList中，可更改搜索方法，以提高搜索效率
              //   console.log(1111)
              openList = InsertOrderedArray(openList,neighbor);
              signgrid[neighbor.getX()][neighbor.getY()] = 0;
              // openList.push(neighbor);
            }
          }
          
        }

        // console.log("display openlist:" );
        // for (let i = 0; i < openList.length; i++) {
        //   console.log(openList[i]);
        // }
        flat++;
        
        ////////////////////////////////分界线//////////////////////////////////");

      }
      console.log("Run times:", + flat);
      
      console.log("=================================");
      return [];
    }
}

//window.AstarAlgorithm = AstarAlgorithm;

function AStarSearch() {

  let test = new Array();
  test = [22.7376308,114.2231193,22.7375711,114.2231025,22.7375176,114.2231025,22.7374694,114.2231240,22.7374278,114.2231569,22.7373972,114.2231949];

    //坐标位置
    let points_two_dim = new Array();
    points_two_dim[0] = new Array();      //经度数据
    points_two_dim[1] = new Array();      //纬度数据
    for (let i = 0; i < test.length/2;i++) {
      let j = 2*i;
      points_two_dim[0][i] = test[2*i+1];
      points_two_dim[1][i] = test[2*i];
    }
   
    return points_two_dim;
}

function NodeToPoints(StartPosition,nodelist,Resolution)
{
    //坐标位置
    let points_two_dim = new Array();
    points_two_dim[0] = new Array();      //经度数据
    points_two_dim[1] = new Array();      //纬度数据
    for (let i = 0; i < nodelist.length;i++) {

      points_two_dim[0][i] = nodelist[i].getX() * Resolution + StartPosition[0];
      points_two_dim[1][i] = nodelist[i].getY() * Resolution + StartPosition[1];
    }
    return points_two_dim;
}

function GridToPosition(StartPosition,Grid,Resolution)
{
    var  GeograPhicpoint = new Array(2);
    GeograPhicpoint[0] = StartPosition[0] + Grid[0] * Resolution;    //经度位置
    GeograPhicpoint[1] = StartPosition[1] + Grid[1] * Resolution;    //经度位置
    return GeograPhicpoint;
}