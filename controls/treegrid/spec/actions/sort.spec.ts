import { TreeGrid } from '../../src/treegrid/base/treegrid';
import { createGrid, destroy } from '../base/treegridutil.spec';
import { sampleData, projectData } from '../base/datasource.spec';
import { Sort } from '../../src/treegrid/actions/sort';

/**
 * Grid base spec 
 */
TreeGrid.Inject(Sort);

describe('TreeGrid Sort module', () => {
  describe('Flat Data Single Sort Descending', () => {
    let gridObj: TreeGrid;
    let actionComplete: () => void;
    beforeAll((done: Function) => {
      gridObj = createGrid(
        {
          dataSource: projectData,
          idMapping: 'TaskID',
          parentIdMapping: 'parentID',
          treeColumnIndex: 1,
          allowSorting: true,
          allowMultiSorting: true,
          columns: ['TaskID', 'TaskName', 'StartDate', 'EndDate']
        },done);
    });

    it('expand testing', (done: Function) => {
      actionComplete = (args?: Object): void => {
         expect(gridObj.getRows()[0].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Parent Task 2").toBe(true);
         expect(gridObj.getRows()[1].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Child Task 1").toBe(true);
         expect(gridObj.getRows()[0].getElementsByClassName('e-rowcell')[0].innerHTML == "3").toBe(true);
         expect(gridObj.getRows()[1].getElementsByClassName('e-rowcell')[0].innerHTML == "4").toBe(true);
         expect(gridObj.parentData.length).toBe(2);
         done();
      }
      gridObj.grid.actionComplete = actionComplete;
      gridObj.sortByColumn("TaskName", "Descending", true);
    });
    afterAll(() => {
      destroy(gridObj);
    });
  });

  describe('Flat Data Single Sort Ascending', () => {
    let gridObj: TreeGrid;
    let actionComplete: () => void;
    beforeAll((done: Function) => {
      gridObj = createGrid(
        {
          dataSource: projectData,
          idMapping: 'TaskID',
          parentIdMapping: 'parentID',
          treeColumnIndex: 1,
          allowSorting: true,
          columns: ['TaskID', 'TaskName', 'StartDate', 'EndDate']
        },done);
    });

    it('expand testing', (done: Function) => {
      actionComplete = (args?: Object): void => {
         expect(gridObj.getRows()[0].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Parent Task 1").toBe(true);
         expect(gridObj.getRows()[1].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Child Task 1").toBe(true);
         expect(gridObj.getRows()[0].getElementsByClassName('e-rowcell')[0].innerHTML == "1").toBe(true);
         expect(gridObj.getRows()[1].getElementsByClassName('e-rowcell')[0].innerHTML == "2").toBe(true);
         expect(gridObj.parentData.length).toBe(2);
         done();
      }
      gridObj.sortByColumn("TaskName", "Ascending", true);
      gridObj.grid.actionComplete = actionComplete;
      gridObj.clearSorting();
    });
    afterAll(() => {
      destroy(gridObj);
    });
  });

  describe('Hierarchy data Single sort Ascending', () => {
    let gridObj: TreeGrid;
    let actionComplete: () => void;
    beforeAll((done: Function) => {
      gridObj = createGrid(
        {
          dataSource: sampleData,
          childMapping: 'subtasks',
          treeColumnIndex: 1,
          allowSorting: true,
          columns: ['taskID', 'taskName', 'startDate', 'endDate']
        },done);
    });

    it('expand testing', (done: Function) => {
      actionComplete = (args?: Object): void => {
         expect(gridObj.getRows()[0].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Design").toBe(true);
         expect(gridObj.getRows()[1].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Design complete").toBe(true);
         expect(gridObj.getRows()[8].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Implementation Module 1").toBe(true);
         expect(gridObj.getRows()[9].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Bug fix").toBe(true);
         expect(gridObj.getRows()[16].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Implementation Module 2").toBe(true);
         expect(gridObj.getRows()[31].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Planning").toBe(true);
         done();
      }
      gridObj.sortByColumn("taskName", "Ascending", false);
      gridObj.grid.actionComplete = actionComplete;
    });
    afterAll(() => {
      destroy(gridObj);
    });
  });

  describe('Multi sort Ascending', () => {
    let gridObj: TreeGrid;
    let actionComplete: () => void;
    beforeAll((done: Function) => {
      gridObj = createGrid(
        {
          dataSource: sampleData,
          childMapping: 'subtasks',
          treeColumnIndex: 1,
          allowSorting: true,
          columns: ['taskID', 'taskName', 'startDate', 'endDate']
        },done);
    });

    it('expand testing', (done: Function) => {
      actionComplete = (args?: Object): void => {
         expect(gridObj.getRows()[0].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Design").toBe(true);
         expect(gridObj.getRows()[0].getElementsByClassName('e-rowcell')[0].innerHTML == "6").toBe(true);
         expect(gridObj.getRows()[1].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Design complete").toBe(true);
         expect(gridObj.getRows()[1].getElementsByClassName('e-rowcell')[0].innerHTML == "11").toBe(true);
         expect(gridObj.getRows()[8].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Implementation Module 1").toBe(true);
         expect(gridObj.getRows()[8].getElementsByClassName('e-rowcell')[0].innerHTML == "14").toBe(true);
         expect(gridObj.getRows()[9].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Bug fix").toBe(true);
         expect(gridObj.getRows()[9].getElementsByClassName('e-rowcell')[0].innerHTML == "18").toBe(true);
         expect(gridObj.getRows()[16].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Implementation Module 2").toBe(true);
         expect(gridObj.getRows()[16].getElementsByClassName('e-rowcell')[0].innerHTML == "22").toBe(true);
         expect(gridObj.getRows()[31].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Planning").toBe(true);
         expect(gridObj.getRows()[31].getElementsByClassName('e-rowcell')[0].innerHTML == "1").toBe(true);
         done();
      }    
      gridObj.grid.actionComplete = actionComplete;
      gridObj.sortByColumn("taskName", "Ascending", true);  
      gridObj.sortByColumn("taskID", "Ascending", true);
    });   
    afterAll(() => {
      destroy(gridObj);
    });
  });

  describe('Single sort Descending', () => {
    let gridObj: TreeGrid;
    let actionComplete: () => void;
    beforeAll((done: Function) => {
      gridObj = createGrid(
        {
          dataSource: sampleData,
          childMapping: 'subtasks',
          treeColumnIndex: 1,
          allowSorting: true,
          columns: ['taskID', 'taskName', 'startDate', 'endDate']
        },done);
    });

    it('expand testing', (done: Function) => {
      actionComplete = (args?: Object): void => {
         expect(gridObj.getRows()[0].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Planning").toBe(true);
         expect(gridObj.getRows()[1].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Planning complete").toBe(true);
         expect(gridObj.getRows()[8].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Testing").toBe(true);
         expect(gridObj.getRows()[9].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Phase 3 complete").toBe(true);
         expect(gridObj.getRows()[16].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Testing").toBe(true);
         expect(gridObj.getRows()[30].getElementsByClassName('e-rowcell')[1].querySelector("div>.e-treecell").innerHTML == "Design").toBe(true);
         done();
      }
      gridObj.sortByColumn("taskName", "Descending", true);
      gridObj.grid.actionComplete = actionComplete;
    });
    afterAll(() => {
      destroy(gridObj);
    });
  });

  describe('Sorting Propertychange', () => {
    let gridObj: TreeGrid;
    beforeAll((done: Function) => {
      gridObj = createGrid(
        {
          dataSource: sampleData,
          childMapping: 'subtasks',
          treeColumnIndex: 1,
          columns: ['taskID', 'taskName', 'startDate', 'endDate', 'duration', 'progress'],
        },
        done
      );
    });

    it('allowSorting and sortSettings using onproperty', () => {
      gridObj.allowSorting = true;
      gridObj.allowMultiSorting = true;
      gridObj.sortSettings = { columns: [{ field: 'taskName', direction: 'Descending' }] };
    });
    afterAll(() => {
      destroy(gridObj);
    });
  });

  describe('Remove Sort Column', () => {
    let gridObj: TreeGrid;
    beforeAll((done: Function) => {
      gridObj = createGrid(
        {
          dataSource: sampleData,
          childMapping: 'subtasks',
          treeColumnIndex: 1,
          allowSorting: true,
          columns: ['taskID', 'taskName', 'startDate', 'endDate']
        },done);
    });

    it('Remove Sorting', () => {
      gridObj.sortByColumn("taskName", "Descending", true);
      gridObj.removeSortColumn('taskName');
      expect(gridObj.sortSettings.columns.length).toBe(0);
    });
    afterAll(() => {
      destroy(gridObj);
    });
  });
});
