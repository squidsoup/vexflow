/**
 * VexFlow - Basic Tests
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */

Vex.Flow.Test.Stave = {}

Vex.Flow.Test.Stave.Start = function() {
  module("Stave");
  Vex.Flow.Test.runTest("Stave Draw Test (Canvas)", Vex.Flow.Test.Stave.draw);
  Vex.Flow.Test.runTest("Vertical Bar Test (Canvas)",
      Vex.Flow.Test.Stave.drawVerticalBar);
  Vex.Flow.Test.runRaphaelTest("Stave Draw Test (Raphael)",
      Vex.Flow.Test.Stave.draw);
  Vex.Flow.Test.runRaphaelTest("Vertical Bar Test (Raphael)",
      Vex.Flow.Test.Stave.drawVerticalBar);
  Vex.Flow.Test.runTest("Multiple Stave Barline Test (Canvas)",
      Vex.Flow.Test.Stave.drawMultipleMeasures);
  Vex.Flow.Test.runTest("Multiple Stave Repeats Test (Canvas)",
      Vex.Flow.Test.Stave.drawRepeats);
  Vex.Flow.Test.runRaphaelTest("Multiple Stave Barline Test (Raphael)",
      Vex.Flow.Test.Stave.drawMultipleMeasures);
  Vex.Flow.Test.runRaphaelTest("Multiple Stave Repeats Test (Raphael)",
      Vex.Flow.Test.Stave.drawRepeats);
  Vex.Flow.Test.runTest("Multiple Staves Volta Test (Canvas)",
      Vex.Flow.Test.Stave.drawVoltaTest);
  Vex.Flow.Test.runRaphaelTest("Multiple Staves Volta Test (Raphael)",
      Vex.Flow.Test.Stave.drawVoltaTest);
}

Vex.Flow.Test.Stave.draw = function(options, contextBuilder) {
  var ctx = new contextBuilder(options.canvas_sel, 400, 120);
  var stave = new Vex.Flow.Stave(10, 10, 300);
  stave.setContext(ctx);
  stave.draw();

  equals(stave.getYForNote(0), 100, "getYForNote(0)");
  equals(stave.getYForLine(5), 100, "getYForLine(5)");
  equals(stave.getYForLine(0), 50, "getYForLine(0) - Top Line");
  equals(stave.getYForLine(4), 90, "getYForLine(4) - Bottom Line");

  ok(true, "all pass");
}

Vex.Flow.Test.Stave.drawVerticalBar = function(options, contextBuilder) {
  var ctx = contextBuilder(options.canvas_sel, 400, 120);
  var stave = new Vex.Flow.Stave(10, 10, 300);
  stave.setContext(ctx);
  stave.draw();
  stave.drawVerticalBar(50, true);
  stave.drawVerticalBar(150, false);
  stave.drawVertical(250, true);
  stave.drawVertical(300);

  ok(true, "all pass");
}

Vex.Flow.Test.Stave.drawMultipleMeasures = function(options, contextBuilder) {
    // Get the rendering context
      var ctx = contextBuilder(options.canvas_sel, 550, 200);

      // bar 1
      var staveBar1 = new Vex.Flow.Stave(10, 50, 200);
      staveBar1.setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);
      staveBar1.setEndBarType(Vex.Flow.Barline.type.DOUBLE);
      staveBar1.setSection("A", 0);
      staveBar1.addClef("treble").setContext(ctx).draw();
      var notesBar1 = [
        new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
        new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
        new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" })
      ];

      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);


      // bar 2 - juxtaposing second bar next to first bar
      var staveBar2 = new Vex.Flow.Stave(staveBar1.width + staveBar1.x, staveBar1.y, 300);
      staveBar2.setSection("B", 0);
      staveBar2.setEndBarType(Vex.Flow.Barline.type.END);
      staveBar2.setContext(ctx).draw();
       
      var notesBar2_part1 = [
        new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "8" }),
        new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "8" }),
        new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "8" }),
        new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "8" })
      ];
       
      var notesBar2_part2 = [
        new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "8" }),
        new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "8" }),
        new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "8" }),
        new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "8" })
      ];
       
      // create the beams for 8th notes in 2nd measure
      var beam1 = new Vex.Flow.Beam(notesBar2_part1);
      var beam2 = new Vex.Flow.Beam(notesBar2_part2);
      var notesBar2 = notesBar2_part1.concat(notesBar2_part2);

      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar2, notesBar2);
       
      // Render beams
      beam1.setContext(ctx).draw();
      beam2.setContext(ctx).draw();    
}

Vex.Flow.Test.Stave.drawRepeats = function(options, contextBuilder) {
    // Get the rendering context
      var ctx = contextBuilder(options.canvas_sel, 550, 120);

      // bar 1
      var staveBar1 = new Vex.Flow.Stave(10, 0, 250);
      staveBar1.setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);
      staveBar1.setEndBarType(Vex.Flow.Barline.type.REPEAT_END);
      staveBar1.addClef("treble");
      staveBar1.addKeySignature("A");
      staveBar1.setContext(ctx).draw();
      var notesBar1 = [
        new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
        new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
        new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" })
      ];

      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar1, notesBar1);


      // bar 2 - juxtaposing second bar next to first bar
      var staveBar2 = new Vex.Flow.Stave(staveBar1.width + staveBar1.x, staveBar1.y, 250);
      staveBar2.setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);
      staveBar2.setEndBarType(Vex.Flow.Barline.type.REPEAT_END);
      staveBar2.setContext(ctx).draw();
       
      var notesBar2_part1 = [
        new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "8" }),
        new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "8" }),
        new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "8" }),
        new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "8" })
      ];
       
      var notesBar2_part2 = [
        new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "8" }),
        new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "8" }),
        new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "8" }),
        new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "8" })
      ];
      notesBar2_part2[0].addAccidental(0, new Vex.Flow.Accidental("#"));
      notesBar2_part2[1].addAccidental(0, new Vex.Flow.Accidental("#"));
      notesBar2_part2[3].addAccidental(0, new Vex.Flow.Accidental("b"));
      // create the beams for 8th notes in 2nd measure
      var beam1 = new Vex.Flow.Beam(notesBar2_part1);
      var beam2 = new Vex.Flow.Beam(notesBar2_part2);
      var notesBar2 = notesBar2_part1.concat(notesBar2_part2);

      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, staveBar2, notesBar2);
       
      // Render beams
      beam1.setContext(ctx).draw();
      beam2.setContext(ctx).draw();    
}
Vex.Flow.Test.Stave.drawVoltaTest = function(options, contextBuilder) {
    // Get the rendering context
      var ctx = contextBuilder(options.canvas_sel, 725, 200);

      // bar 1
      var mm1 = new Vex.Flow.Stave(10, 50, 125);
      mm1.setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);
      mm1.setRepetitionTypeLeft(Vex.Flow.Repetition.type.SEGNO_LEFT, -18);
      mm1.addClef("treble");
      mm1.addKeySignature("A")
      mm1.setMeasure(1);
      mm1.setSection("A", 0);
      mm1.setContext(ctx).draw();
      var notesmm1 = [
        new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "w" }),
      ];
      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, mm1, notesmm1);

      // bar 2 - juxtapose second measure
      var mm2 = new Vex.Flow.Stave(mm1.width + mm1.x, mm1.y, 60);
      mm2.setRepetitionTypeRight(Vex.Flow.Repetition.type.CODA_RIGHT, 0);
      mm2.setMeasure(2);
      mm2.setContext(ctx).draw();
      var notesmm2 = [
        new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "w" })
      ];
      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, mm2, notesmm2);

      // bar 3 - juxtapose third measure
      var mm3 = new Vex.Flow.Stave(mm2.width + mm2.x, mm1.y, 60);
      mm3.setVoltaType(Vex.Flow.Volta.type.BEGIN, "1.", -5);
      mm3.setMeasure(3);
      mm3.setContext(ctx).draw();
      var notesmm3 = [
        new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "w" })
      ];
      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, mm3, notesmm3);
      
      // bar 4 - juxtapose fourth measure
      var mm4 = new Vex.Flow.Stave(mm3.width + mm3.x, mm1.y, 60);
      mm4.setVoltaType(Vex.Flow.Volta.type.MID, "", -5);
      mm4.setMeasure(4);
      mm4.setContext(ctx).draw();
      var notesmm4 = [
        new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "w" })
      ];
      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, mm4, notesmm4);
      
      // bar 5 - juxtapose fifth measure
      var mm5 = new Vex.Flow.Stave(mm4.width + mm4.x, mm1.y, 60);
      mm5.setEndBarType(Vex.Flow.Barline.type.REPEAT_END);
      mm5.setVoltaType(Vex.Flow.Volta.type.END, "", -5);
      mm5.setMeasure(5);
      mm5.setContext(ctx).draw();
      var notesmm5 = [
        new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "w" })
      ];
      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, mm5, notesmm5);
      
      // bar 6 - juxtapose sixth measure
      var mm6 = new Vex.Flow.Stave(mm5.width + mm5.x, mm1.y, 60);
      mm6.setVoltaType(Vex.Flow.Volta.type.BEGIN_END, "2.", -5);
      mm6.setEndBarType(Vex.Flow.Barline.type.DOUBLE);
      mm6.setMeasure(6);
      mm6.setContext(ctx).draw();
      var notesmm6 = [
        new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "w" })
      ];
      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, mm6, notesmm6);

      // bar 7 - juxtapose seventh measure
      var mm7 = new Vex.Flow.Stave(mm6.width + mm6.x, mm1.y, 60);
      mm7.setMeasure(7);
      mm7.setSection("B", 0);
      mm7.setContext(ctx).draw();
      var notesmm7 = [
        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "w" })
      ];
      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, mm7, notesmm7);
      
      // bar 8 - juxtapose eighth measure
      var mm8 = new Vex.Flow.Stave(mm7.width + mm7.x, mm1.y, 60);
      mm8.setEndBarType(Vex.Flow.Barline.type.DOUBLE);
      mm8.setRepetitionTypeRight(Vex.Flow.Repetition.type.DS_AL_CODA, 25);
      mm8.setMeasure(8);
      mm8.setContext(ctx).draw();
      var notesmm8 = [
        new Vex.Flow.StaveNote({ keys: ["c/5"], duration: "w" })
      ];
      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, mm8, notesmm8);

      // bar 9 - juxtapose ninth measure
      var mm9 = new Vex.Flow.Stave(mm8.width + mm8.x + 20, mm1.y, 125);
      mm9.setEndBarType(Vex.Flow.Barline.type.END);
      mm9.setRepetitionTypeLeft(Vex.Flow.Repetition.type.CODA_LEFT, 25);
      mm9.addClef("treble");
      mm9.addKeySignature("A");
      mm9.setMeasure(9);
      mm9.setContext(ctx).draw();
      var notesmm9 = [
        new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "w" })
      ];
      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, mm9, notesmm9);

}