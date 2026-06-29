# CCEA 3-002

[00:00:00] Okay, now we're onto module three. So module three is gonna be the core workflow. So the better that you have a systematic process, the better your output's gonna be. The better that you can refine it, the less errors that you're gonna run into, et cetera. So we have a predictable plan every single time we have planet.

Build it, validate it, review it, ship it. And so this is with any and every skill that you essentially use. So when it comes to cooking or when it comes to writing a book, right? Or building apps, right? You, you outline, you plan your structure, you write the content, you draft it up, you proofread, you check for errors, you get feedback from others, you publish it and share with the world, and you go round and round on that process.

It's the same here when it comes to building out applications and whatever you're building, [00:01:00] whether it's websites, applications, whatever you wanna build, right? So you have the plan. This is gonna create the spec right here. That command, we have the build that's gonna write the code, it's gonna build that thing that you had planned out.

You have the validate. So it's gonna test, it's gonna run tests. You have the review, it's gonna be able to check the quality, and then you have the commit and that's gonna be able to ship it. And then we have the specs folder. So I know that I kind of briefly touched upon it in the first two modules, going in deeper.

Now we have a specs done folder. So. These are created, these MD files are created by the EA plan that we have, the slash command that we have. So we'll go over that and we'll see that it goes into that to-do folder, and then we have the specs done folder, and then that gets moved. To the done folder. After the EA build command is done building and this becomes your [00:02:00] project history.

So Cloud code has their own plan system. However, I like to make sure that I can see exactly the versions prior to, and my team and others can also see if they clone the repo and they can work on it as well. I want people to be able to see. Where we started and what we evolved from and be able to reiterate and refine as needed.

So here's some quick workflow recipes that are common that you'll typically see from others. So you have a quick bug fix. So this is like the smallest, smallest type of workflow that you'll see, or recipe that you'll see. So quick fixes that you're confident about, you'll use this. So you have the build command, you have the validate command, and then you have the commit command.

And this is gonna be when you fix bug alignments, correct? Correct. Typos. Update config files. Whatever small [00:03:00] stuff that you know that the model can handle, and you know that it's not a lot to do, you just type in your prompt, whatever the case is, and then boom, you're good to go. For a new feature, you wanna have more of the standard workflow that you have.

So if you're adding a user profile, implementing search, creating a dashboard, et cetera, right? And sometimes you even wanna make sure that if they're com complex. For me, for instance, I like to plan out, before I even start building, I like to plan out every single thing that I want to have in that platform or in that app.

And I will have 5, 10, 15, 20 different specs and it has multiple phases inside of each one. It has up to three phases. If they're complex, I don't go over three phases because that makes. Sure that it can handle all of that. When you have Claude code, given that spec sheet [00:04:00] or that MD file of that plan, it can go and execute it cleanly and not be overwhelmed.

Right? It's just like a person that you have under your wing, right? If you're a boss and you give your work to a coworker. You are not giving him like an encyclopedia book worth of information, right? You need to break that apart, otherwise he's not gonna be able to execute efficiently and effectively, right?

So you wanna be able to break them down into phases. I would say three is like the max, especially for complex stuff. And then just create multiple spec sheets. And then you have the security one. So this is gonna be for like payment processing. You wanna make sure that you add in a security command.

We'll get into that a little bit later as we go throughout the course, but you just wanna match the recipe with the thing that you're trying to do, whether it's a quick fix or it's a full entire run. [00:05:00] These are gonna be the commands that we go into. So we have the plan one, the build, validate, review, and commit.

Those are gonna be the core workflow ones. We have the prime, which we talked about in the last module. Handoff pickup, same thing, and then install. We also did that as well. So we can install these commands, right, and make them universal. So we have the plan that creates the spec. This one builds it. This one tests and verifies it.

This one review. So it compares it to the spect, is what we built match what was laid out in the plan, or did Claude code go off rails? Build something that we didn't ask it to or go over the top right. We wanna be very particular on that and then commit. So we can use this command to push and commit changes to GitHub.

If we are putting it onto a platform for other people to be able to use, we can use CEL and. That is just a platform where people can go [00:06:00] and check your app that you had built and use it. So that's all the commands that we have. Now, we're in the plan mode, and we could see the difference between plan mode versus our plan mode, right?

The one that I had created for you guys, the difference is, is that this is built in plan mode that Claude Code uses. You can use it. By holding the shift tab button and cycle through. The difference is that, is that it disappears once you create the plan. It doesn't store that anywhere. And so what we wanna do is we want to make sure that we document our plan and our process.

It's good and it's great for review and be like, okay, so we had implemented this. We wanna make sure that this was actually implemented, right? So yeah, the next steps is to be able to clone the repo and then we'll follow along. And then we're gonna go ahead and type in ls. We see that we have this folder.

We're gonna go ahead and CD [00:07:00] into it. So CC. And then we'll type in LS again. We could see that the two modules that we had previously, those are now in there, and so we wanna add a new one. So we're just gonna go ahead and do get cologne just like we've normally been doing. We now have that one. So we're gonna go ahead and CD into that particular repo.

And so now. We're gonna type in cursor and then dot, and then it'll boot up cursor, and now we're inside of that project directory. Or that repo or that folder. Right? A lot of these names are very interchangeable. You'll hear a lot of these a lot. I wanna make sure that that's kind of like beaten in your head so that you don't get confused as the variations of how people say certain things.

Understanding the terminology for me has been. Insanely beneficial when it comes to just understanding any skill that [00:08:00] I've ever learned. So understanding terminology is very important and the different variations of how that termina term terminology is. So inside of here, we have the dot clawed file.

This is where our commands live, right? We had the other ones from the previous one. Now we have the build. We have plan. We have review, we have validate, and then we also have commit, and then we have handoff and pickup and prime. We can install all of these commands. This is for you guys, so you can install these with ease, right?

We have guides in here. So this is a guide to choosing your right workflow for your task. So there's recipe one shows the quick fix, the success rate is 75% approximately. It's not as high as the standard or as the full sec, full width security. So these are just. Three basic recipes that you'll see time and time again.

People will do. [00:09:00] That's why I put 'em in here. And then the decision flow chart, if you want to go ahead and check this out. Is it a small fix? Yes. Quick fix recipe? No. Does it touch authorization payments? User data? No. Standard, yes. Full security. Right. Then this is the templates. So here's a spec template of what essentially is gonna be put into the to-do when it's created.

So we have the problem statement, what problem does this feature solve? Why are we building it? We have the objectives. So this is the primary objective, secondary, additional, right? Then we have the technical approach, we have the overview, we have the architecture and key components. Then inside of the implementation phases, it shows how many phases and then the testing strategy.

So it has manual testing, it has automated testing, so I have testing essentially built in. [00:10:00] So whenever you create a plan, it runs a little bit of tests in there. It's not as in depth as the validate one, but it's there. It's always good to have multiple tests, ram, and then we have the success criteria, potential challenges, and then notes.

So this is what we're gonna see whenever we create a to-do spec, right? Whenever we create a spec sheet or a plan of the thing, we go into the readme. We can see before the purpose, the purpose, having the core workflow structure. Each phase has its own command, so on and so forth, right? Getting into a systematic process makes it very easy.

For you to be able to execute efficiently and know what stage you're at. So when you get a chance, definitely read these very valuable information. Breaks down all of this way further. And then we have the CP js ON. So right here we have a playwright cp. [00:11:00] So this allows it to open up the browser automatically, have cloud code, open up the browser, take screenshots and verify right.

So that is through our process. So if we go ahead and we open up Claude, we are just gonna type in Claude. And so now again, ignore this, this omni cortex, that's just my thing automatically gets put in. But if we go ahead and we do slash EA plan and we'll type in the plan and we're gonna go ahead and we hit tab, and now we're just gonna go ahead and describe.

It's the thing that we wanna build. So let's say I wanna build like a thumbnail generator, right? I wanna build a. YouTube thumbnail generator. I wanna be able to bring in images, whether it's images of myself or other people, or icons, and then it creates a thumbnail of that image. It recreates it, it [00:12:00] keeps the same consistency.

We wanna make sure that we're using Nano Banana Pro. I want you to go and search the web to see what other YouTube thumbnail generators have, not too much, maybe like three websites, and also implement those common features across the board. So we're gonna go ahead and send that off and we'll come back when this is finished and we'll go over that whole thing.

So it's actually creating. We could see that Mk DIR, we could see that it's creating a folder and it already has it, so it's good to go. We're actually gonna go ahead and look at this Plan MD while it's creating that so we can kind of break it apart, see the internals of it. So here's the quick plan purpose.

Create a plan, a detailed implementation plan based on the user's requirements. The plan is saved to specs to do, and can be later built with the slash build. This separates planning from execution. For cleaner workflows, and this [00:13:00] is actually incorrect, it would be EA dash build. Because we're gonna be using this one right here, right?

And then the variables is just the prompt. So the user prompt and then the output directory, right? We have the instructions include code, examples or pseudo code where helpful. And honestly, this is just a plan. Md We should honestly remove this because we don't need this because this is just a plan with the build command, that's when it's essentially gonna create the code.

We don't want to have the plan or spec sheet to have code that just is copied into the build, right? We want Claude code to build it from scratch, and so this should be eliminated so we can actually go ahead and. Eliminate that. You don't need to, if you wanna have that in there, but just something that I wanted to mention and then so on and so forth, right?

It has the workflows, [00:14:00] it sets up the folders, analyzes the requirements, designs the solution, assess complexity, document the plan, and then saves and reports it. And then the report is gonna be this, so it'll spit out this information back to us. It'll say plan, created file, and this is the file name, specs to do.

And so we'll see here that it gets created in there, the phases and then the key components, and then it lets us know too. Use this command to run in our next terminal session. We wanna make sure that with each phase, when it's plan, build, validate, review, and then deploy or commit that each one of those runs its own terminal session.

Because the less context there is, the better the output that Claude Code is gonna have. So we're gonna go here. It looks like it is gonna, it's still exploring. So it did some research on [00:15:00] YouTube thumbnail generators, and now it's exploring the existing code based structure. So it's gonna see here that.

We don't have any information and that we might want to create an app. So I'm gonna go ahead and let that run and we'll come back once this is all finished. Okay, so it just came back with the results and we could see here that the plan was created. The file shows here, the topic, the phases, so it looks like there's six.

And then research sources, architecture, and then it lets us know to run right? This is what we had set up to make it super easy for us to see. Anytime we create a spec sheet, this is what it comes back with. So that took six minutes to run. And if we look here in the specs to do, we can now see that MD file.

So if we click into it, we have the same structure as our template, right? Problem statement, objectives, technical approach, [00:16:00] implementation phases, testing strategy, success criteria, potential challenges, notes, right? So if we open this up and we do that, and then we have this one run YouTube thumbnail, we could see here very similar, right?

This is the exact structure that we're looking for, right? So you can add to this, you can modify it however you want. But this is a template, so it was able to break down exactly how it wanted it, and after doing research. So if we look back into here, we can see that it did the research it called 19 Tools, 33,000 tokens, 27 Tools here for exploring the code base, so on and so forth, right?

So now we're done with the planning, right? And now we wanna go ahead and build when we wanna build. Again, we have a large context window that we wanna fully utilize, make sure that it's clean every single time. So we're [00:17:00] just gonna go ahead and type in slash context. It's gonna go ahead and pull up. And so we see here I have a lot of CPS that I haven't taken away.

That's 50 per that's, that's 26% that is being utilized. Then we have the messages. So we have 10%, right? So we wanna make sure that when we're building this out, that we have a clean context window every single time. So we're just gonna go ahead and we're gonna go ahead and open up a new terminal session, type in Claude, and then we're gonna go ahead and type in the slash.

EA build and then we see here path to plan, right? That's what I was telling you about earlier in regards to the slash command. So the EA build, we could see here the argument, hint, it just lets us know what to put in here if we need to. So we could do plan, feature, or task description, right? Whenever [00:18:00] we ran the slash plan, it shows feature or description, so that doesn't get.

Accounted for when you're writing out the plan. It just lets you know what you can do. You don't have to have those on, but that's just an easy little thing. But yeah, we'll go ahead and we'll do build and then we'll do that specific plan. So we'll type in at, and then we'll type in just like any part of the name, so YouTube thumbnail generator, and we see that that pops up.

So we'll go ahead and hit enter, or we can hit tab, either one works. Then we can go ahead and run this, right? So it's gonna go ahead and read. We can see that it was 300 lines for that spec sheet, so not a very big spec sheet. And then it sees that it's gonna implement the whole entire thing, right? So I'm gonna go ahead and just interrupt that.

We don't need to actually have it build it, but it goes and breaks down the phases and then it's going to go ahead and [00:19:00] execute that right now. A couple other things that I wanna say is once we're done with the build, we want to validate it. So validate comes before the review. So validate just pretty much means that it runs validation tests to ensure the application works correctly, automatically detects the project type and runs appropriate tests.

It uses this after the build to verify your implementation. And we see here the variables, right? If we're just doing like a quick fix. You can type in this. After you type in the command, the ea validate command, you could do this and it'll know just to do fix mode or quick mode if you want. Just like a super quick mode.

You got that, and then you have the instructions so that it's gonna go ahead and, and, and go through that. It's gonna go and understand the project detection and then the workflow is that it's gonna run. Type checking, run linting, run, build tests, all this type of [00:20:00] stuff, right? You can look at all of these if you want to, but these are gonna be the tests that it runs.

If the application is for this specific test, right, it's gonna go ahead and detect the project type before it's gonna go ahead and run all these other things. But it's essentially just gonna make sure that your code works properly and then it's gonna provide a report. And then here are some examples, basic quick auto, and then.

We have the review. So the review step is slightly different because you compare the implemented code against the original specification to ensure that you built what was planned. So if we go here, it's gonna go ahead and review the spec sheet and make sure what was actually built with the app matches what was.

Planned and it will say op. It also says, optionally capture screenshots of working features. So it's gonna go ahead and use the MCP, the playwright MCP. We'll get into the CPS later and how they work. [00:21:00] It's gonna go ahead and pull up the app wherever it's at. Take screenshots of the app. Then it's going to save them in a de dedicated file.

So that is the review. You can set this up however you want. This is a very standard way. And then we have the commit. So what does the commit do? Let's look into that. So create a get commit with properly formatted description message analyzes changes, and generates a meaningful commit message if none provided, and then it goes.

And. You can add in your prompt. This is essentially just the user message, so on and so forth, right? These are the instructions, commit types, when to use, all that sort of stuff. But if you want any of these, you can just run the slash install command, this EA dash install, and you have the ability to have these universally, or you can bring these, copy these over into another project.

Just make sure that you, [00:22:00] inside of that directory, you have the dot clawed, and then you have another folder, sub folder underneath that one called commands. And then you could just add these exact ones into that new directory. This is the core workflow. You can make it as small, you can modify it however you want, but this is a baseline for everybody to kind of follow and just kind of get on board on just so you understand the flow when building apps.

Next, we're gonna go ahead and look at CPS now.

