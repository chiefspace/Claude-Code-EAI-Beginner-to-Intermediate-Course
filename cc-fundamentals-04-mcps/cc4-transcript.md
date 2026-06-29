# CCEA 4-007

[00:00:00] Okay, module number four. Now we're getting into the fun stuff. So these are called model context protocol. What the hell does that even mean? These aren't just API wrappers. They're Claude's plugin system and it's just part of the package of what plugins are. Don't worry, we will go over them later on in the course, and so this allows you having cps let's Claude talk to other apps in your life.

So you can connect to tools that you already use. So think of like Google or Instagram or LinkedIn. If you want to create a post, you can edit documents directly inside of Claude Code. You can create documents, you can add stuff to your calendar, social media posts. You can generate images using Nana Banana Pro.

You can create videos now. With certain skills, and we'll get into that a little bit [00:01:00] later. But the video that you're watching right here and the videos that you have been watching, those have all been created with Claude Code and a skill and a connecting different tools together to generate images like this image right here.

Now, what's an API? Right? So this is pretty much the basics of what an API is. Think of it like this. So you say whatever you wanna say to Claude. Say, I want pasta. And this is like the waiter analogy. This is a very common analogy as to understanding what APIs are. You say, I want pasta. You say that to the waiter.

The waiter is the MCP. The waiter takes your order, brings it to the kitchen and says, Hey, we need to make this food for this person. Right. And it makes the food, the food is ready, it brings it back, and then you get your pasta, right? And so an A PIA messenger that carries [00:02:00] requests, brings it back, brings back responses.

So you say a command or you say what you want from that service, like create a PDF document or add this to the database if you have a database, MCP. Then it will go and it will go and execute on that task. So an MCP in action with real examples of cps, you have the notion MCP, so you can check tasks and it'll come back with the response.

You have three tasks due today. You can use a super base MCP if you're not familiar with that. It's just a database, uh, very fancy database and. You can add to the database. You can say, add these clients, or add these people, or make or add a table to this database or a column, and it will go and do that Slack MCP, post this update.

And then it'll me [00:03:00] send the message. So again, this is just the universal pattern. You send a message to Claude saying what you want. Claude Code brings that to the MCP and the MCP. Goes and grabs that service, and then that service executes on that. It brings it back throughout the flow. And then another way to kind of understand CPS is that it's just the middleman that speaks both to Claude code and the service, and APIs are the keys to unlock that specific service.

So the reason why we wanna keep our API keys safe and in a specific folder that doesn't get pushed to GitHub, that's because if anybody else uses that, it will use that service. There is a charge for how much you use that service to an extent. Some are free, some are not. But if you use that service. [00:04:00] Have other people use that service, they could use your account.

So it's like logging into your email and like being able to see all your emails and all that stuff. So that's why you wanna be careful when it comes to having your API keys and just keeping them in a specific folder and making sure that Claude Code or anybody else doesn't see them. So we have the three different capabilities as to what CCPs can do.

So we have tools. So actions that Claude can perform. These are some of the ones that you have seen already, right? Super based notion. Slack. You have the GitHub, MCP, and then there's a memory MCP that you can create as well, or a playwright, which we kind of already touched upon. We have data Claude can access, so resources super based will also be able to go into here and then prompts.

So templates that Cloud code can use. So what do they actually do? What does each one actually do? [00:05:00] So for here we can see that playwright can take screenshots by opening up a Chrome extension and navigating through and clicking all the buttons, right? You have notion where it searches the pages, creates pages, updates, databases, so on and so forth, right?

You can definitely pause the video and check all of this out if you want to. And right here at the bottom we can see that super base can do multiple. Now, MCP capability usage in the wild, we can see that most people are gonna use the tools. That's 90% of what CPS are used for. There is also two other areas in which you can use cps and I will go over that.

I had created some MCPS for you guys to be able to play with if you want to and and have, and like I said, most people just know about tools, but there's two other options. And then here are some popular [00:06:00] mcps and then how everything starts to fit together. So a plugin. Essentially an MCP commands skills all bundled together into a nice package, right?

So we'll go over skills and we'll go over hooks, and that's what plugins are. But, um, CPS are just external services that you want to have Claude Code have access to. And I believe that is pretty much it. The key takeaways, CPS are plugins. Less is more to start with. That's one thing that I wanna emphasize is you wanna have less to start lower context utilization and then security first.

So we'll go over the security part as well before you go in and just and install any ordinary MCP and then I believe it's just the same, the next steps. Yep. We're gonna go ahead and clone this repo. So we're gonna go ahead and open up the terminal session as per use. [00:07:00] What we've been doing. This should be muscle memory.

Now that you've done this a couple times, so we see here we're gonna CD into that specific directory, and then we're gonna see that from the last three modules. Those are the three that we have right here. And then we're gonna do get Cologne, and then we're gonna go ahead and paste in the new one, the MCPS module.

So now that we have that cloned, we're gonna go ahead and CD into that specific one, and then we're gonna go ahead and type in cursor dot and that's gonna boot up the cursor environment. So now that we're in the cursor environment, we're gonna go ahead and see we is the breakdown of this, right? So right here we have just your normal commands right here.

For the guides, we have specific guides, so if you wanna go deeper [00:08:00] into any one of these, we have A MCP security. So this one actually breaks down the security on how to run cps, making sure that you go about this process. So the reality is CPS are powerful because they can execute commands on your computer, read and write files, access your credentials, connect.

External services. This power requires trust. Before installing an MCP, you wanna evaluate it. So the MCP Security evaluator, you want to use this framework. If you click into here, it opens up the evaluator. This is a just essentially just some instructions or an overview, a markdown file that I had found on just making sure that you have.

The security in place and that it runs tests on the MCP that you're installing if you install one. And while it's [00:09:00] not a hundred percent foolproof, it does. You can definitely read the instructions and, and all of this to kind of get a good sense, but it's gonna create a scoring on how secure this MCP is, the privacy, the reliability, the transparency, the usability, and the overall rating, and then the final verdict.

It will give you a clear statement as to whether this MCP should be used or not, and key recommendations and so on and so forth. So. This just kind of breaks down. If you ever end up using GitHub to go and search for cps, which I have here, I have recommended MCP lists in here, and you can check those with this framework.

So just want to give that these are the safe practices, so on and so forth. I'll have you guys read those. If you wanna go deeper into 'em. This is the recommended mcps. So here [00:10:00] we have these four, which is the playwright file system, memory, super base, right? And then these kind of go back into breaking down each and every one.

The purpose why we use it, installation, and then the example usage. And you know, you could say, take a screenshot of local hosts, blah, blah, blah. Or click the login button to show me what happens. And that's what, that's an example of what you would say naturally. To activate this. They're based on essentially key words.

So you can do that or you can invoke it by saying, Hey, I want you to use the playwright MCP to execute X, Y, and Z. Right? We have three different capabilities. That's kind of when I, what I went over. Most people only know about tools. You'll only pretty much use it for tools unless you wanna create some other mcps.

Then this breaks down what an MCP is. You got the three CPS here that I had created for you guys. So we have a journal one, a memory one, and a prompts [00:11:00] one. Then we have a template. So this shows the template of a full list of like all CPS that are here, right? We have super base what it would look like, all that sort of stuff.

And then. We have the actual CP js ON. So these get brought in. This is project based cps. So if we open up this, if we open up Claude and we type in Claude, and then we type in M ccp, we can see here that we have project based CPS right here, and these are going to be connecting. And then we have user-based mcps.

And we have the user base. CPS are pretty much universal. I can use these anywhere and everywhere, right? So one thing to keep in mind is we have all of these mcps, right? And that takes up a lot of context. So if we type in slash context, we can see here all of these [00:12:00] mcps, right? That's a lot of mcps, right?

30%. Of our context window, essentially 60,000 tokens being utilized right off the rip 81,000 tokens. Right. So we wanna go ahead and we wanna just go ahead and disable a couple of my universal ones so we can go ahead and hit disable. We go into the magic one. Hit disable for that one. My Omni Cortex, which is my memory.

MCP. We have a super base one. And then we have a built-in one, which is Claude in Chrome. So it's similar to the playwright MCP. The reason why I have the playwright MCP versus the Claude one is, and I don't know if this has changed, but, or the Claude in Chrome, whenever I tried to ask it to save the screenshots, to verify it's work.

Using the slash review command, right when we were doing the, in the last module, I had the slash review, it would not save those screenshots to [00:13:00] a specific folder. However, playwright did it with such ease, so that's why I just went ahead and just made sure that you guys had this if you want to. But this does the same thing as the playwright.

And so now that we have the user ones. Disabled. We can go ahead and we'll actually disable the Clain Chrome one as well, since we have the playwright one. And so now if we go back into context, we can see much cleaner, right? Much leaner. About only 4% of CPS are being used or shown, right? So lot less, right?

And you could see here that these are all the tools, so the playwright can close resize. See the console, console messages, all this type of stuff, right? There are commands where we can load MCP tools on demand. That is gonna be shown here in the windows or the [00:14:00] Mac. These are, they're gonna be the commands that you would use.

They may work, they may not. Sometimes they're kind of a little tricky, but. Overall, if you want to load them on Deme on demand to be able to save your context window a little bit more and just load the specific tools, you can do that here. And so what we're gonna do is we're just gonna go ahead and run Claude, and we're gonna kind of go over the.

CPS that we have, that I had created for you guys, just to show you a use case as to how they can be applied or used. So right now, if we type in MCP, we can see all of these and we can even see that the claw.ai with a couple of the newer versions, this will pop up. So I just went ahead and disabled those.

Also disabled, the built in one, and then my universal ones, and then the [00:15:00] project based ones. And these are the ones that we're gonna go kind of go over. So there's a journal one, a memory, one, a prompts one, and then a playwright one. Right? So here I can say, list all the memories using the memory MCP, and it's gonna use the tool list memories.

We're gonna use this, this memory, MCP. And it's gonna see, you know, uh, asks us if we wanna go ahead and proceed. We wanna say yes, don't ask again. And if we look here before we actually go ahead and send this off, if we go into, actually it's not loaded up right now, but it will be loaded once we hit. Yes.

So we'll go ahead and hit Yes. We see the settings that local JSON got created and this shows the permissions that are allowed. So now Claude Code doesn't ask each and every time to use this specific one. So another thought, another thing is I actually had this [00:16:00] saved as a memory earlier. So the memory ID is this I, the memory is Mark as the goat tags is personal.

The importance is 50, and then it was created. Two, four. Right? So this is a personal memory, right? And then I'm gonna just go ahead and make sure that if we go ahead and we want to use all three of these cps that it won't ask us each and every time. So just a little trick that I wanna show you guys real quick, but that is, I want you to update the settings.

Local JS o file and for the permissions allow, I want to make sure that we allow all the permissions for all the project based CPS that we have in this directory. So we'll go ahead and send that off, and we will go ahead and see that this is being updated. So it's gonna search for this file right here, and it's gonna update this so that it doesn't have to [00:17:00] ask us each and every time for every MCP.

And so we see here. MCP memory, this little asterisk lets us know that no matter what tool is being used from the memory MCP, it's just gonna go ahead and allow it. So now I can go ahead and I say, I want you to remove the memory one that we have, and then I want you to create three more memories. One memory being, I like pineapple on my pizza.

A second one being that Tony does. Jujitsu. And then a third one being is that Tony and Mark teach Claude code courses. So just random, right? And we see here that we're getting that tool use again to delete the memory. Now the reason being is because we need to actually restart the Claude so Claude code session for these permissions to take into effect.

So I'm actually gonna go [00:18:00] ahead and copy this. And see how it shows the tool use. If we go into Claude again and then paste that in there, it won't ask us. It's gonna go ahead and execute, right? It's gonna list the memories, delete the memories, remember information. So three memories and be here. It's asking to delete the memory, right?

Whereas here now we don't have that issue. It did, did it, without having to ask for our permission because of that, so. Yep. Now we got this done. I've cleared the old memory and created three new ones. Pineapple and Pizza. Tony does Jujitsu. Tony and Mark teach cloud code courses, right? So, and then there's a tagging based system.

So this is just one use case that you can use. CCPs four, you can use it for mc four memory, you can use it for prompts or if you want to journal. And then also connecting different tools. So. [00:19:00] That is gonna be pretty much it for the MCP module. Definitely take a look at the internals and the guts of these cps, like the memory, this is all of what this MCP is made of, and so, yeah.

